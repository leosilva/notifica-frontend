import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { AppRoutes } from './routes/app-routes';
import './App.css';

function App() {
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
