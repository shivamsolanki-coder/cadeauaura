interface SectionLabelProps {
  label: string;
}

export function SectionLabel({ label }: SectionLabelProps) {
  return (
    <span className="inline-flex rounded-full border border-gold-200/25 bg-gold-200/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-gold-200 shadow-[0_0_30px_rgba(246,213,138,0.12)]">
      {label}
    </span>
  );
}
