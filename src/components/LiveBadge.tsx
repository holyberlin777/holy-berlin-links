import { siteConfig } from "../config/siteConfig";

/** Zeigt den LIVE-Hinweis nur an, wenn siteConfig.isLive true ist. */
export function LiveBadge() {
  if (!siteConfig.isLive) return null;

  const label = siteConfig.liveLabel?.trim() || "🔴 LIVE";

  const badgeClassName =
    "mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-400 transition-transform hover:scale-105";

  const dot = (
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
    </span>
  );

  if (siteConfig.liveUrl) {
    return (
      <a
        href={siteConfig.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={badgeClassName}
        aria-label={`${label} – öffnet in neuem Tab`}
      >
        {dot}
        {label}
      </a>
    );
  }

  return (
    <span className={badgeClassName} role="status">
      {dot}
      {label}
    </span>
  );
}
