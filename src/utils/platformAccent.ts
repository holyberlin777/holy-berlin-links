/**
 * Liefert eine dezente, zur jeweiligen Plattform passende Akzentfarbe
 * (als CSS-Variable aus dem HOLY BERLIN Farbsystem, siehe src/index.css).
 * Dient nur als subtiler Glow/Akzent auf den Link-Cards – keine
 * offiziellen Markenfarben, sondern eigene Energy-Palette.
 */
export function getPlatformAccent(icon: string | undefined): string {
  switch (icon?.toLowerCase().trim()) {
    case "twitch":
      return "var(--color-brand-violet)";
    case "tiktok":
      return "var(--color-brand-cyan)";
    case "youtube":
      return "var(--color-brand-orange)";
    case "instagram":
      return "var(--color-brand-pink)";
    case "whatsapp":
      return "var(--color-brand-green)";
    case "discord":
      return "var(--color-brand-blue)";
    case "telegram":
      return "var(--color-brand-blue)";
    case "spotify":
      return "var(--color-brand-green)";
    case "snapchat":
      return "var(--color-brand-yellow)";
    case "threads":
      return "var(--color-brand-violet)";
    case "kick":
      return "var(--color-brand-green)";
    case "x":
    case "twitter":
      return "var(--color-brand-cyan)";
    default:
      return "var(--color-brand-cyan)";
  }
}
