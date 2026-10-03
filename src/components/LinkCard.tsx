import type { CSSProperties } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import type { LinkItem } from "../config/siteConfig";
import { PlatformIcon } from "../utils/icons";
import { getPlatformAccent } from "../utils/platformAccent";

interface LinkCardProps {
  link: LinkItem;
}

/** Ein großer Glass-Card-Link-Button mit dezentem Plattform-Akzent. */
export function LinkCard({ link }: LinkCardProps) {
  const accent = getPlatformAccent(link.icon);
  const sharedStyle = { "--accent": accent } as CSSProperties;

  const icon = (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/80 transition-colors duration-300 group-hover:text-[var(--accent)]">
      <PlatformIcon icon={link.icon} className="h-6 w-6" />
    </span>
  );

  const topEdge = (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
    />
  );

  // "Coming soon": bewusst keine echte URL, nicht klickbar, dezent abgesetzt.
  if (link.comingSoon || !link.url) {
    return (
      <div
        style={sharedStyle}
        className="group relative flex items-center gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.03] p-4 opacity-70"
      >
        {topEdge}
        {icon}

        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-bold text-brand-text">
            {link.title || "Link"}
          </span>
          <span className="line-clamp-2 text-sm italic text-brand-muted">
            {link.description || "Coming soon..."}
          </span>
        </span>

        <Clock
          className="h-5 w-5 shrink-0 text-brand-muted"
          aria-hidden="true"
        />
      </div>
    );
  }

  const accessibleLabel = link.description
    ? `${link.title} – ${link.description}`
    : link.title;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${accessibleLabel} (öffnet in neuem Tab)`}
      style={sharedStyle}
      className="group relative flex items-center gap-4 overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_4px_24px_-18px_var(--accent)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_16px_40px_-12px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg active:scale-[0.99]"
    >
      {topEdge}
      {icon}

      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-bold text-brand-text">
          {link.title || "Link"}
        </span>
        {link.description && (
          <span className="line-clamp-2 text-sm text-brand-muted">
            {link.description}
          </span>
        )}
      </span>

      <ArrowUpRight
        className="h-5 w-5 shrink-0 text-brand-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
        aria-hidden="true"
      />
    </a>
  );
}
