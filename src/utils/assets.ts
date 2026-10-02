/**
 * Löst einen in siteConfig.ts hinterlegten Asset-Pfad (z. B. das Logo) so auf,
 * dass er sowohl bei einer Bereitstellung unter "/" (Vercel, Netlify, eigene
 * Domain) als auch unter einem Unterpfad (z. B. GitHub Pages Projekt-Repo)
 * funktioniert. Vollständige externe URLs bleiben unverändert.
 */
export function resolveAssetPath(path: string): string {
  if (!path) return path;
  if (/^[a-z]+:/i.test(path)) {
    // Absolute URL (https://…) oder Data-URI – unverändert zurückgeben.
    return path;
  }

  const base = import.meta.env.BASE_URL;
  return path.startsWith("/") ? `${base}${path.slice(1)}` : `${base}${path}`;
}
