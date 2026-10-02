import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { siteConfig } from "./src/config/siteConfig.ts";

/**
 * Ersetzt %SITE_NAME%, %SITE_TITLE% und %SITE_DESCRIPTION% in index.html mit
 * den Werten aus siteConfig.ts, damit Name/Beschreibung für SEO-Tags nicht
 * zusätzlich in index.html gepflegt werden müssen.
 */
function siteMetaHtmlPlugin(): Plugin {
  const replacements: Record<string, string> = {
    SITE_NAME: siteConfig.name,
    SITE_TITLE: `${siteConfig.name} | Links`,
    SITE_DESCRIPTION: siteConfig.description,
  };

  return {
    name: "site-meta-html",
    transformIndexHtml(html) {
      return html.replace(/%(SITE_\w+)%/g, (match, key: string) => replacements[key] ?? match);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteMetaHtmlPlugin()],
  // Für ein GitHub Pages Projekt-Repo (https://user.github.io/repo-name/)
  // hier auf "/repo-name/" setzen. Für Vercel, Netlify oder eine eigene
  // Domain bleibt "/" korrekt. Siehe README.md → "Veröffentlichen".
  base: "/",
});
