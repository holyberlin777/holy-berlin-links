import { siteConfig } from "../config/siteConfig";
import { PlatformIcon } from "../utils/icons";

/**
 * Kompakte Icon-Reihe unter der Bio-Beschreibung. Greift auf dieselben
 * Link-Daten wie die großen Buttons zu – keine doppelte Pflege nötig.
 */
export function SocialIcons() {
  if (siteConfig.links.length === 0) return null;

  return (
    <nav
      aria-label="Social-Media-Profile"
      className="mt-5 flex flex-wrap items-center justify-center gap-3"
    >
      {siteConfig.links.map((link) => (
        <a
          key={`social-${link.title}-${link.url}`}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.title}
          title={link.title}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-brand-muted backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
        >
          <PlatformIcon icon={link.icon} className="h-5 w-5" />
        </a>
      ))}
    </nav>
  );
}
