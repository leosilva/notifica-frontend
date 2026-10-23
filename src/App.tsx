import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { AppRoutes } from './routes/app-routes';
import {useRefresh} from './lib/auth'
import './App.css';
import { useEffect } from 'react';

function App() {
  
  const { refresh, aviso: refreshAviso } = useRefresh();

  useEffect(() => {
    const QUINZE_MINUTOS = 15 * 60 * 1000;

    refresh();

    const interval = setInterval(() => {
      refresh();
    }, QUINZE_MINUTOS);

    return () => clearInterval(interval);
  }, [refresh]);

  const avisoAtual = refreshAviso.mensagem;

  return (
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <AppRoutes />
        </ThemeProvider>
      </TooltipProvider>
    </BrowserRouter>
  );
}

export default App;
