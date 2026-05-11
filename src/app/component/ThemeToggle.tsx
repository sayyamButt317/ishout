'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';

// This is the recommended pattern to avoid hydration mismatch
// without triggering the setState-in-effect ESLint rule
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false  // server snapshot — returns false during SSR
  );
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <Button
  type="button"
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  aria-label="Toggle theme"
  className="
    relative h-11 w-11 overflow-hidden rounded-2xl
    border border-white/10 bg-foreground/5 text-foreground
    backdrop-blur-xl
    transition-all duration-300
    hover:scale-105 hover:border-white/20 hover:bg-foreground/10
    active:scale-95
    shadow-lg shadow-black/20
    dark:bg-white/5 dark:hover:bg-white/10
  "
>
  <div className="relative flex items-center justify-center">
    {theme === 'dark' ? (
      <Sun
        className="
          size-5 text-yellow-300
          transition-all duration-300
          rotate-0 scale-100
        "
      />
    ) : (
      <Moon
        className="
          size-5 text-shadow-blue-300
          transition-all duration-300
          rotate-0 scale-100
        "
      />
    )}
  </div>

  {/* glow */}
  <div
    className={`
      absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
      ${theme === 'dark'
        ? 'bg-yellow-400/10 hover:opacity-100'
        : 'bg-slate-400/10 hover:opacity-100'}
    `}
  />
</Button>
  );
}