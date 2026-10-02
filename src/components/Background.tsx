/**
 * Rein dekorativer Hintergrund: dunkler Verlauf, dezentes Grid und
 * weiche Farb-Glows. Liegt fix hinter dem Inhalt und blockiert keine Klicks.
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-brand-bg"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      <div className="animate-pulse-glow absolute -left-24 -top-32 h-80 w-80 rounded-full bg-brand-orange/25 blur-[110px]" />
      <div className="absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-brand-blue/20 blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-brand-green/15 blur-[110px]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg" />
    </div>
  );
}
