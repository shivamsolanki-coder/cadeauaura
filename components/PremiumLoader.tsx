'use client';

import { useEffect, useState } from 'react';

export function PremiumLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#05030a] text-gold-200 transition-opacity duration-700">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-gold-300/30 animate-[spin_1.6s_linear_infinite]" />
        <span className="absolute inset-4 rounded-full border border-luxury-purple/40 animate-[spin_2.4s_linear_infinite_reverse]" />
        <span className="font-serif text-2xl tracking-[0.28em] text-gold-200">CA</span>
      </div>
    </div>
  );
}
