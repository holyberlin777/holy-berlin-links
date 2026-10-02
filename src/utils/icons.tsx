import type { JSX } from "react";
import { Link2 } from "lucide-react";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaSnapchat,
  FaSpotify,
  FaTelegram,
  FaThreads,
  FaTiktok,
  FaTwitch,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SiKick } from "react-icons/si";

interface PlatformIconProps {
  icon: string | undefined;
  className?: string;
}

/**
 * Zeigt automatisch das zum icon-Wert aus siteConfig.ts passende Icon an.
 * Unbekannte oder fehlende Icon-Namen fallen auf ein neutrales Link-Icon
 * zurück, statt einen Fehler zu werfen. Neue Plattform? Einfach einen
 * weiteren case ergänzen.
 */
export function PlatformIcon({ icon, className }: PlatformIconProps): JSX.Element {
  const props = { className, "aria-hidden": true as const };

  switch (icon?.toLowerCase().trim()) {
    case "twitch":
      return <FaTwitch {...props} />;
    case "tiktok":
      return <FaTiktok {...props} />;
    case "youtube":
      return <FaYoutube {...props} />;
    case "instagram":
      return <FaInstagram {...props} />;
    case "whatsapp":
      return <FaWhatsapp {...props} />;
    case "discord":
      return <FaDiscord {...props} />;
    case "x":
    case "twitter":
      return <FaXTwitter {...props} />;
    case "facebook":
      return <FaFacebook {...props} />;
    case "telegram":
      return <FaTelegram {...props} />;
    case "snapchat":
      return <FaSnapchat {...props} />;
    case "threads":
      return <FaThreads {...props} />;
    case "spotify":
      return <FaSpotify {...props} />;
    case "kick":
      return <SiKick {...props} />;
    default:
      return <Link2 {...props} />;
  }
}
