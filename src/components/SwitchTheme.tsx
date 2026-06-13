import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const THEME_KEY = 'theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

export default function SwitchTheme() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? DARK_THEME : LIGHT_THEME);

    if (initialTheme === DARK_THEME) {
      document.documentElement.classList.add(DARK_THEME);
    } else {
      document.documentElement.classList.remove(DARK_THEME);
    }

    setTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);

    if (newTheme === DARK_THEME) {
      document.documentElement.classList.add(DARK_THEME);
    } else {
      document.documentElement.classList.remove(DARK_THEME);
    }
  };

  if (theme === null) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-surface/80 backdrop-blur-sm border border-border/60 text-foreground hover:text-headings hover:border-headings/30 transition-all duration-300 cursor-pointer shadow-sm"
      aria-label={`Switch to ${theme === DARK_THEME ? 'light' : 'dark'} theme`}
    >
      {theme === DARK_THEME ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
