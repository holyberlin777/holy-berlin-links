/**
 * Liefert eine dezente, zur jeweiligen Plattform passende Akzentfarbe
 * (als CSS-Variable aus dem Cousinchen Farbsystem, siehe src/index.css).
 * Wird für Icon- und Pfeil-Einfärbung beim Hover verwendet – keine
 * offiziellen Markenfarben, sondern eigene Energy-Palette.
 */
export function getPlatformAccent(icon: string | undefined): string {
  switch (icon?.toLowerCase().trim()) {
    case "twitch":
      return "var(--color-brand-red)";
    case "tiktok":
      return "var(--color-brand-cyan)";
    case "youtube":
      return "var(--color-brand-red)";
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

/**
 * Liefert den weichen Hintergrund-Glow hinter einer Link-Card (als CSS
 * background-image-Wert). Die meisten Plattformen bekommen einen runden
 * Verlauf in ihrer Akzentfarbe, Twitch bewusst einen mehrfarbigen,
 * smoothen Schwarz-Rot-Cyan-Verlauf.
 */
export function getPlatformGlow(icon: string | undefined): string {
  switch (icon?.toLowerCase().trim()) {
    case "twitch":
      return "linear-gradient(135deg, #060606 0%, #ff3b3b 52%, #2dd9ff 100%)";
    case "tiktok":
      return "radial-gradient(circle, var(--color-brand-cyan), transparent 70%)";
    case "youtube":
      return "radial-gradient(circle, var(--color-brand-red), transparent 70%)";
    case "instagram":
      return "radial-gradient(circle, var(--color-brand-pink), transparent 70%)";
    case "whatsapp":
      return "radial-gradient(circle, var(--color-brand-green), transparent 70%)";
    case "discord":
      return "radial-gradient(circle, var(--color-brand-blue), transparent 70%)";
    case "telegram":
      return "radial-gradient(circle, var(--color-brand-blue), transparent 70%)";
    case "spotify":
      return "radial-gradient(circle, var(--color-brand-green), transparent 70%)";
    case "snapchat":
      return "radial-gradient(circle, var(--color-brand-yellow), transparent 70%)";
    case "threads":
      return "radial-gradient(circle, var(--color-brand-violet), transparent 70%)";
    case "kick":
      return "radial-gradient(circle, var(--color-brand-green), transparent 70%)";
    case "x":
    case "twitter":
      return "radial-gradient(circle, var(--color-brand-cyan), transparent 70%)";
    default:
      return "radial-gradient(circle, var(--color-brand-cyan), transparent 70%)";
  }
}
