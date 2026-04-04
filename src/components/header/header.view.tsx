import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ModeToggle } from '../mode-toggle';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { memo } from 'react';

interface Type {
  frase: string;
}

const Header = memo(({ frase }: Type) => {
  return (
    <header className="relative z-10 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg w-full dark:bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-1 ring-primary/20 ring-offset- ring-offset-background">
                <AvatarImage />
                <AvatarFallback
                  className="font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #00b4a6, #008b7a)',
                  }}
                ></AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 dark:bg-emerald-900 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-emerald-400 dark:text-emerald-800">
                Olá, asdyuidsa
              </h1>
              <p className="text-sm text-muted-foreground font-medium">
                {frase}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3"></div>
          <div className="flex flex-row gap-4 items-center">
            <ModeToggle />
            <button
              className="rounded-sm ring-1 hover:bg-emerald-400 ring-emerald-400/50 dark:hover:bg-primary/5 hover:ring-4 dark:hover:ring-emerald-400/60 dark:ring-emerald-600/60 transition-all duration-300 dark:bg-black/80 h-9 w-16 flex items-center flex-row justify-around px-1 bg-emerald-500 text-amber-50"
              onClick={() => toast('desconectado com sucsso')}
              type="button"
            >
              <LogOut className="h-4 w-4 mr-2 " />
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

export default Header;
