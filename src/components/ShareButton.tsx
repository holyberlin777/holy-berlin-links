import { useEffect, useRef, useState } from "react";
import { Check, Share2 } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

/**
 * Teilen-Button: nutzt die native Web Share API, falls verfügbar.
 * Andernfalls wird die aktuelle URL in die Zwischenablage kopiert.
 * Beide Wege sind defensiv abgesichert und werfen nie einen Fehler.
 */
export function ShareButton() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function handleShare() {
    const shareData = {
      title: siteConfig.name,
      text: siteConfig.description,
      url: window.location.href,
    };

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
      } catch {
        // Nutzer:in hat den Teilen-Dialog abgebrochen – kein Fehlerfall.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Zwischenablage nicht verfügbar – Seite bleibt trotzdem funktionsfähig.
    }
  }

  return (
    <div className="fixed right-4 top-4 z-20 sm:right-6 sm:top-6">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Seite teilen"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-brand-text backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_30px_-10px_var(--color-brand-cyan)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
      >
        {copied ? (
          <Check className="h-5 w-5 text-brand-green" aria-hidden="true" />
        ) : (
          <Share2 className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      <span
        role="status"
        aria-live="polite"
        className={`absolute right-0 top-full mt-2 whitespace-nowrap rounded-lg border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-brand-text backdrop-blur-xl shadow-lg transition-all duration-200 ${
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        Link kopiert
      </span>
    </div>
  );
}
