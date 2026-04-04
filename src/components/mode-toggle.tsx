import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title="Alternar tema"
      className="min-w-10 min-h-10 hover:scale-110 hover:bg-emerald-400 bg-emerald-500 dark:bg-black dark:hover:bg-emerald-950 duration-300 ring-1 ring-emerald-300 dark:ring-emerald-900 hover:ring-4"
    >
      <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90  dark:scale-0 text-amber-50" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-amber-50" />
      <span className="sr-only">Alternar tema</span>
    </Button>
  );
}
