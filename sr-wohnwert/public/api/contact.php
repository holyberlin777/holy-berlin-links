<?php
/**
 * Kontaktformular – Mail-Versand
 * ------------------------------------------------------------------
 * Nimmt die Formulardaten der Website entgegen, prüft sie und sendet
 * sie per E-Mail an das Unternehmen. Es werden keine Daten gespeichert
 * (nur ein kurzlebiger, nicht rückrechenbarer Hash der IP-Adresse in einer
 * temporären Datei zur Begrenzung der Anfragen pro Stunde).
 *
 * Einstellungen: siehe Konstanten direkt darunter.
 */

declare(strict_types=1);

// --- Einstellungen -------------------------------------------------
const MAIL_TO_DEFAULT = 'info@sr-wohnwert.de';    // Empfänger für alle Anfragen
const MAIL_TO_ANKAUF  = 'ankauf@sr-wohnwert.de';  // Empfänger für Thema "Ankauf / Grundstück"
const MAIL_FROM       = 'website@sr-wohnwert.de'; // Absender (sollte zur eigenen Domain gehören)
const MAIL_FROM_NAME  = 'Website S & R Wohnwert';
const SUBJECT_PREFIX  = '[sr-wohnwert.de] ';
const MIN_FILL_SECONDS = 3;       // schneller ausgefüllte Formulare gelten als Bot
const MAX_PER_HOUR     = 5;       // Anfragen pro Gerät und Stunde
const MAX_BODY_BYTES   = 65536;   // 64 KB

const TOPICS = [
    'projekt'     => 'Projektanfrage',
    'ankauf'      => 'Ankauf / Grundstück',
    'beteiligung' => 'Beteiligung / Joint Venture',
    'bauen'       => 'Sanieren & Bauen',
    'sonstiges'   => 'Sonstiges',
];
// -------------------------------------------------------------------

header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$wantsJson = isset($_SERVER['HTTP_ACCEPT']) && stripos((string) $_SERVER['HTTP_ACCEPT'], 'application/json') !== false;

/** Antwort senden: JSON für das Formular-Skript, Weiterleitung für Browser ohne JavaScript */
function respond(bool $ok, int $status, string $error = '', array $fields = [])
{
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'error' => $error, 'fields' => $fields], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: /' . ($ok ? '?sent=1' : '?error=1') . '#kontakt', true, 303);
    }
    exit;
}

/** Zeichenanzahl (UTF-8), auch ohne mbstring */
function str_len(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : (int) preg_match_all('/./su', $value);
}

/** Steuerzeichen entfernen, Whitespace normalisieren (einzeilige Felder) */
function clean_line($value, int $max): string
{
    $value = is_string($value) ? $value : '';
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    $value = trim(preg_replace('/\s{2,}/u', ' ', $value) ?? '');
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

/** Mehrzeiliger Text: Zeilenumbrüche erhalten, andere Steuerzeichen entfernen */
function clean_text($value, int $max): string
{
    $value = is_string($value) ? $value : '';
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]+/u', '', $value) ?? '';
    $value = trim(preg_replace("/\n{3,}/", "\n\n", $value) ?? '');
    return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

/** Header-Wert kodieren (Umlaute im Betreff) */
function encode_header(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

// --- Grundprüfungen ------------------------------------------------
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(false, 405, 'method');
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    respond(false, 413, 'too-large');
}

// Nur Anfragen von der eigenen Website zulassen (sofern der Browser eine Herkunft mitsendet)
$origin = (string) ($_SERVER['HTTP_ORIGIN'] ?? '');
if ($origin !== '') {
    $originHost = (string) parse_url($origin, PHP_URL_HOST);
    $ownHost    = (string) strtok((string) ($_SERVER['HTTP_HOST'] ?? ''), ':');
    if ($originHost === '' || strcasecmp($originHost, $ownHost) !== 0) {
        respond(false, 403, 'origin');
    }
}

// Honeypot: dieses Feld ist für Menschen unsichtbar und muss leer bleiben
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    // Bots erhalten eine scheinbar erfolgreiche Antwort, es wird aber nichts gesendet
    respond(true, 200);
}

// Zeitprüfung (nur wenn das Skript den Zeitstempel gesetzt hat)
$ts = $_POST['ts'] ?? '';
if (is_string($ts) && ctype_digit($ts) && $ts !== '') {
    $ageSeconds = (time() * 1000 - (int) $ts) / 1000;
    if ($ageSeconds < MIN_FILL_SECONDS || $ageSeconds > 86400 * 2) {
        respond(false, 422, 'timing');
    }
}

// --- Felder prüfen -------------------------------------------------
$name    = clean_line($_POST['name'] ?? '', 120);
$email   = clean_line($_POST['email'] ?? '', 160);
$phone   = clean_line($_POST['phone'] ?? '', 60);
$topicId = clean_line($_POST['topic'] ?? 'sonstiges', 30);
$message = clean_text($_POST['message'] ?? '', 4000);
$consent = isset($_POST['consent']) && $_POST['consent'] !== '';

$errors = [];
if (str_len($name) < 2) {
    $errors[] = 'name';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n,;<>]/', $email)) {
    $errors[] = 'email';
}
if (str_len($message) < 10) {
    $errors[] = 'message';
}
if (!$consent) {
    $errors[] = 'consent';
}
if (!array_key_exists($topicId, TOPICS)) {
    $topicId = 'sonstiges';
}
if ($errors) {
    respond(false, 422, 'validation', $errors);
}

// --- Begrenzung pro Gerät und Stunde -------------------------------
$ip   = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
$salt = hash('sha256', __FILE__ . date('Y-m-d'));
$file = rtrim(sys_get_temp_dir(), '/\\') . DIRECTORY_SEPARATOR . 'srw_rl_' . substr(hash('sha256', $ip . $salt), 0, 32);
$now  = time();
$hits = [];
if (is_file($file)) {
    $decoded = json_decode((string) @file_get_contents($file), true);
    if (is_array($decoded)) {
        $hits = array_values(array_filter($decoded, static fn ($t) => is_int($t) && $t > $now - 3600));
    }
}
if (count($hits) >= MAX_PER_HOUR) {
    respond(false, 429, 'rate-limit');
}
$hits[] = $now;
@file_put_contents($file, json_encode($hits), LOCK_EX);
foreach (glob(dirname($file) . DIRECTORY_SEPARATOR . 'srw_rl_*') ?: [] as $old) { // alte Dateien aufräumen
    if (@filemtime($old) < $now - 3600) {
        @unlink($old);
    }
}

// --- Mail zusammenstellen und senden -------------------------------
$topic   = TOPICS[$topicId];
$to      = $topicId === 'ankauf' ? MAIL_TO_ANKAUF : MAIL_TO_DEFAULT;
$subject = SUBJECT_PREFIX . $topic . ' – ' . $name;

$body  = "Neue Anfrage über das Kontaktformular auf sr-wohnwert.de\n";
$body .= str_repeat('-', 56) . "\n\n";
$body .= "Anliegen:  {$topic}\n";
$body .= "Name:      {$name}\n";
$body .= "E-Mail:    {$email}\n";
$body .= 'Telefon:   ' . ($phone !== '' ? $phone : '–') . "\n\n";
$body .= "Nachricht:\n{$message}\n\n";
$body .= str_repeat('-', 56) . "\n";
$body .= 'Gesendet am ' . date('d.m.Y \u\m H:i') . " Uhr (Serverzeit)\n";
$body .= "Zustimmung zur Datenschutzerklärung: ja\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . encode_header(MAIL_FROM_NAME) . ' <' . MAIL_FROM . '>',
    'Reply-To: ' . $email,
    'X-Auto-Response-Suppress: OOF, AutoReply',
];

$sent = @mail($to, encode_header($subject), $body, implode("\r\n", $headers), '-f' . MAIL_FROM);

if (!$sent) {
    respond(false, 500, 'mail-failed');
}
respond(true, 200);
