interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <span className="inline-flex rounded-full bg-warm-amber px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-deep-rose">
      {label}
    </span>
  );
}
