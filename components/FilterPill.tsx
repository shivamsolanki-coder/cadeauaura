interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-sm transition duration-300 ${
        active
          ? 'border-gold-200 bg-gold-200 text-midnight-black shadow-[0_0_22px_rgba(246,213,138,0.35)]'
          : 'border-white/10 bg-white/[0.06] text-stone-text/80 hover:border-gold-200/50 hover:text-gold-100 hover:shadow-[0_0_18px_rgba(124,58,237,0.28)]'
      }`}
    >
      {label}
    </button>
  );
}
