import { BrowserRouter } from 'react-router';
import { AppRoutes } from './routes/app-routes';
import { ThemeProvider } from './components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/sonner';
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
