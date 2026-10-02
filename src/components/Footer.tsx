import { siteConfig } from "../config/siteConfig";

/** Dezenter Footer – Jahr wird automatisch berechnet, Name kommt aus siteConfig.ts. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 pb-4 pt-6 text-center">
      <div className="mx-auto mb-4 h-px w-16 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <p className="text-xs text-brand-muted">
        © {year} {siteConfig.name}
      </p>
    </footer>
  );
}
