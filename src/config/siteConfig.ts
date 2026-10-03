/**
 * Zentrale Konfiguration der Cousinchen Link-in-Bio Seite.
 *
 * Hier änderst du Name, Beschreibung, Logo, Live-Status und alle Links.
 * Für eine Schritt-für-Schritt-Anleitung siehe README.md.
 *
 * Diese Datei wird automatisch von allen Komponenten geladen – du musst
 * keinen React-Code anfassen, um Inhalte zu ändern.
 */

/**
 * Bekannte Icon-Namen (für Autovervollständigung in deinem Editor).
 * Du kannst auch andere Strings eintragen – unbekannte Namen zeigen
 * automatisch ein neutrales Link-Icon statt eines Fehlers.
 */
export type KnownIcon =
  | "twitch"
  | "tiktok"
  | "youtube"
  | "instagram"
  | "whatsapp"
  | "discord"
  | "x"
  | "twitter"
  | "facebook"
  | "telegram"
  | "snapchat"
  | "threads"
  | "spotify"
  | "kick"
  | "website";

export type IconName = KnownIcon | (string & NonNullable<unknown>);

export interface LinkItem {
  /** Name der Plattform, z. B. "Twitch" */
  title: string;
  /** Kurzer Zusatztext unter dem Titel (optional) */
  description?: string;
  /** Vollständige URL, z. B. "https://twitch.tv/holyberlin" */
  url?: string;
  /** Icon-Schlüssel, siehe IconName weiter oben bzw. src/utils/icons.tsx */
  icon: IconName;
  /**
   * true = Karte wird als "Coming soon" angezeigt: kein echter Link,
   * nicht klickbar, dezent abgesetzt. Nützlich, solange eine Plattform
   * noch keine echte URL hat.
   */
  comingSoon?: boolean;
}

export interface SiteConfig {
  /** Name der Seite / Community, erscheint als Überschrift */
  name: string;
  /** Kurzer Beschreibungstext unter dem Namen */
  description: string;
  /** Pfad zum Logo in /public, z. B. "/logo.svg" oder "/logo.png" */
  logo: string;
  /** true = LIVE-Badge wird angezeigt, false = kein Hinweis */
  isLive: boolean;
  /** Text im LIVE-Badge */
  liveLabel: string;
  /** Optionales Linkziel des LIVE-Badges (z. B. der Twitch-Kanal) */
  liveUrl?: string;
  /** Liste aller Link-Buttons – Reihenfolge = Anzeigereihenfolge */
  links: LinkItem[];
}

export const siteConfig: SiteConfig = {
  name: "Cousinchen",
  description: "Fußball, Gaming & Community ⚽🎮",
  logo: "/logo.jpg",
  isLive: false,
  liveLabel: "🔴 LIVE AUF TWITCH",
  liveUrl: "https://www.twitch.tv/holyberlin",

  links: [
    {
      title: "Twitch",
      description: "Unsere Livestreams",
      url: "https://www.twitch.tv/holyberlin",
      icon: "twitch",
    },
    {
      title: "TikTok",
      description: "Clips, Highlights & mehr",
      url: "https://www.tiktok.com/@cousinchen77",
      icon: "tiktok",
    },
    {
      title: "YouTube",
      description: "Videos, Shorts & Highlights",
      url: "https://www.youtube.com/@HolyBerlin",
      icon: "youtube",
    },
    {
      title: "Instagram",
      description: "Coming soon...",
      icon: "instagram",
      comingSoon: true,
    },
    {
      title: "WhatsApp",
      description: "News & Updates",
      url: "https://whatsapp.com/channel/0029Vb8xDK6F6sn7CTyX832J",
      icon: "whatsapp",
    },
    {
      title: "Discord",
      description: "Unser Community Server",
      url: "https://discord.gg/j69U5YkSC",
      icon: "discord",
    },
  ],
};
