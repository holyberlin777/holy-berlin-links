import { siteConfig } from "../config/siteConfig";

/** Dezenter Footer – Jahr wird automatisch berechnet, Name kommt aus siteConfig.ts. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 pb-4 pt-6 text-center">
      <p className="text-xs text-brand-muted">
        © {year} {siteConfig.name}
      </p>
    </footer>
  );
}
