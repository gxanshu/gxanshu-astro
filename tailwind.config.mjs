/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            fontFamily: `var(--font-inter-variable), var(--font-inter), 'ui-sans-serif', 'system-ui', 'sans-serif'`,
            '--tw-prose-body': 'var(--color-foreground)',
            '--tw-prose-headings': 'var(--color-headings)',
            '--tw-prose-links': 'var(--color-headings)',
            '--tw-prose-bold': 'var(--color-headings)',
            '--tw-prose-bullets': 'var(--palette-400)',
            '--tw-prose-quotes': 'var(--color-headings)',
            '--tw-prose-quote-borders': 'var(--color-accent)',
            '--tw-prose-code': 'var(--color-headings)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-invert-body': 'var(--color-foreground)',
            '--tw-prose-invert-headings': 'var(--color-headings)',
            '--tw-prose-invert-links': 'var(--color-headings)',
            '--tw-prose-invert-bold': 'var(--color-headings)',
            '--tw-prose-invert-bullets': 'var(--palette-400)',
            '--tw-prose-invert-quotes': 'var(--color-headings)',
            '--tw-prose-invert-quote-borders': 'var(--color-accent)',
            '--tw-prose-invert-code': 'var(--color-headings)',
            '--tw-prose-invert-hr': 'var(--color-border)',
          },
        },
      }),
    },
  },
};
