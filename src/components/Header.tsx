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
      <div className="animate-fade-in-up relative">
        <div className="absolute inset-0 -z-10 scale-110 rounded-[32px] bg-gradient-to-br from-brand-orange/40 via-brand-pink/25 to-brand-cyan/40 blur-2xl" />
        <div className="rounded-[28px] bg-gradient-to-br from-brand-orange/70 via-brand-pink/50 to-brand-cyan/70 p-[2px]">
          <div className="h-24 w-24 overflow-hidden rounded-[26px] bg-brand-bg-alt sm:h-28 sm:w-28">
            {showImage ? (
              <img
                src={resolveAssetPath(siteConfig.logo)}
                alt={`${siteConfig.name} Logo`}
                className="h-full w-full object-cover"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-orange/25 via-transparent to-brand-cyan/25 text-3xl font-extrabold text-brand-text">
                {initial}
              </div>
            )}
          </div>
        </div>
      </div>

      <h1
        className="animate-fade-in-up mt-5 text-[1.75rem] font-extrabold tracking-tight text-brand-text sm:text-3xl"
        style={{ animationDelay: "90ms" }}
      >
        {siteConfig.name}
      </h1>

      <div className="animate-fade-in-up" style={{ animationDelay: "150ms" }}>
        <LiveBadge />
      </div>

      {siteConfig.description && (
        <p
          className="animate-fade-in-up mt-3 max-w-sm text-pretty text-sm text-brand-muted sm:text-base"
          style={{ animationDelay: "200ms" }}
        >
          {siteConfig.description}
        </p>
      )}

      <div className="animate-fade-in-up" style={{ animationDelay: "260ms" }}>
        <SocialIcons />
      </div>
    </header>
  );
}
