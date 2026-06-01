/** Light scrim — must stay transparent so site background shows through. */

type ConversionSectionScrimProps = {
  topFade?: boolean;
};

export function ConversionSectionScrim({ topFade = false }: ConversionSectionScrimProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_13_18/0.55)_0%,rgb(5_5_5/0.25)_100%)]" />
      {topFade ? (
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#050505]/90 via-[#050505]/40 to-transparent" />
      ) : null}
    </div>
  );
}
