/**
 * Eigenständiger Cousinchen Energy-Hintergrund: dunkler Grundverlauf,
 * zwei große Farb-Glows (Orange oben links, Cyan unten rechts), ein
 * dezenter violetter Akzent sowie feines Punktmuster + Grain-Textur.
 * Rein dekorativ, blockiert keine Klicks.
 *
 * Die Glows sind bewusst statisch (keine transform-Animation): in
 * Kombination mit dem starken blur() hat das in Safari zu sichtbaren
 * Rendering-Artefakten (einem "geisterhaften" dunklen Rechteck) geführt.
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-brand-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0b16] via-brand-bg to-[#05050a]" />

      <div className="absolute -left-32 -top-40 h-[420px] w-[420px] rounded-full bg-brand-orange/35 blur-[120px] sm:h-[560px] sm:w-[560px]" />
      <div className="absolute -right-32 bottom-[-15%] h-[440px] w-[440px] rounded-full bg-brand-cyan/30 blur-[130px] sm:h-[580px] sm:w-[580px]" />
      <div className="absolute bottom-0 left-[6%] h-72 w-72 rounded-full bg-brand-violet/15 blur-[110px]" />

      <div className="bg-dot-grid absolute inset-0 opacity-[0.05]" />
      <div className="bg-noise absolute inset-0 opacity-[0.035]" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg/85" />
    </div>
  );
}
