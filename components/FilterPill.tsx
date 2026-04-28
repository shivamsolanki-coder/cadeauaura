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
      className={`rounded-full border px-3 py-1 text-sm transition ${
        active
          ? 'border-deep-rose bg-deep-rose text-ivory-cream'
          : 'border-rose-200 bg-white text-stone-text hover:border-deep-rose hover:text-deep-rose'
      }`}
    >
      {label}
    </button>
  );
}
