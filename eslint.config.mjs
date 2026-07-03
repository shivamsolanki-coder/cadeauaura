import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // The draft/reflection hooks intentionally sync localStorage +
      // streamed text into state inside effects. Keep the signal as a
      // warning without blocking lint on the established pattern.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default config;
