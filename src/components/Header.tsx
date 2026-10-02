import { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { resolveAssetPath } from "../utils/assets";
import { LiveBadge } from "./LiveBadge";
import { SocialIcons } from "./SocialIcons";

/** Logo, Name, Live-Status, Beschreibung und Social-Icons – alles aus siteConfig.ts. */
export function Header() {
  const [logoFailed, setLogoFailed] = useState(false);
  const initial = siteConfig.name.trim().charAt(0).toUpperCase() || "?";
  const showImage = Boolean(siteConfig.logo) && !logoFailed;

  return (
    <header className="flex flex-col items-center text-center">
      <div className="h-24 w-24 overflow-hidden rounded-full border border-brand-border bg-brand-surface shadow-[0_0_40px_-12px_rgba(255,106,26,0.45)] sm:h-28 sm:w-28">
        {showImage ? (
          <img
            src={resolveAssetPath(siteConfig.logo)}
            alt={`${siteConfig.name} Logo`}
            className="h-full w-full object-cover"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-orange/30 via-brand-surface to-brand-blue/20 text-3xl font-bold text-brand-text">
            {initial}
          </div>
        )}
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-brand-text sm:text-3xl">
        {siteConfig.name}
      </h1>

      <LiveBadge />

      {siteConfig.description && (
        <p className="mt-3 max-w-sm text-sm text-pretty text-brand-muted sm:text-base">
          {siteConfig.description}
        </p>
      )}

      <SocialIcons />
    </header>
  );
}
