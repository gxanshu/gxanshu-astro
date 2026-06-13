/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            fontFamily: `var(--font-serif), 'IBM Plex Serif', Georgia, serif`,
            '--tw-prose-body': 'var(--ink)',
            '--tw-prose-headings': 'var(--ink)',
            '--tw-prose-links': 'var(--ink)',
            '--tw-prose-bold': 'var(--ink)',
            '--tw-prose-bullets': 'var(--amber)',
            '--tw-prose-quotes': 'var(--ink-2)',
            '--tw-prose-quote-borders': 'var(--amber)',
            '--tw-prose-code': 'var(--ink)',
            '--tw-prose-pre-bg': '#1A1510',
            '--tw-prose-pre-code': '#C9B88F',
            '--tw-prose-hr': 'var(--rule)',
          },
        },
      }),
    },
  },
};
