import { ArrowUpRight } from "lucide-react";
import type { LinkItem } from "../config/siteConfig";
import { PlatformIcon } from "../utils/icons";

interface LinkCardProps {
  link: LinkItem;
}

/** Ein großer, klickbarer Link-Button mit Icon, Titel, optionaler Beschreibung. */
export function LinkCard({ link }: LinkCardProps) {
  const accessibleLabel = link.description
    ? `${link.title} – ${link.description}`
    : link.title;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${accessibleLabel} (öffnet in neuem Tab)`}
      className="group flex items-center gap-4 rounded-2xl border border-brand-border bg-brand-surface/80 p-4 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-orange/40 hover:bg-brand-surface-hover hover:shadow-[0_8px_30px_-12px_rgba(255,106,26,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg active:scale-[0.98]"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-bg text-brand-text transition-colors group-hover:border-brand-orange/40 group-hover:text-brand-orange">
        <PlatformIcon icon={link.icon} className="h-6 w-6" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-semibold text-brand-text">
          {link.title || "Link"}
        </span>
        {link.description && (
          <span className="line-clamp-2 text-sm text-brand-muted">
            {link.description}
          </span>
        )}
      </span>

      <ArrowUpRight
        className="h-5 w-5 shrink-0 text-brand-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-orange"
        aria-hidden="true"
      />
    </a>
  );
}
