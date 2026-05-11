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
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}