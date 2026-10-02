import { siteConfig } from "../config/siteConfig";

/** Zeigt den LIVE-Hinweis nur an, wenn siteConfig.isLive true ist. */
export function LiveBadge() {
  if (!siteConfig.isLive) return null;

  const label = siteConfig.liveLabel?.trim() || "LIVE";

  const badgeClassName =
    "mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-red-300 backdrop-blur-md shadow-[0_0_20px_-6px_rgba(239,68,68,0.65)] transition-transform hover:scale-105";

  const dot = (
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
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
