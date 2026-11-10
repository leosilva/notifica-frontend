import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '../../../components/mode-toggle';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { useLogin } from './login.hook';
import logo from '@/assets/logo.png';

const BASE_URL = import.meta.env.VITE_FRONTEND_BASE_URL;

interface UserAuthResponse {
  role?: 'aluno' | 'servidor' | string;
}

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { Suap, aviso } = useLogin();

  const handleSuapLogin = () => {
    window.location.href = `${BASE_URL}/auth/suap/login`;
  };

  useEffect(() => {
    const controller = new AbortController();

    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${BASE_URL}/auth/me`, {
          method: 'GET',
          credentials: 'include',
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Falha na requisição de autenticação');
        }

        const data: UserAuthResponse = await response.json();

        if (data.role === 'aluno') {
          navigate('/post');
        } else if (data.role === 'servidor') {
          navigate('/comunicados');
        } else {
          setIsLoading(false);
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Erro na verificação de autenticação:', error);
          setIsLoading(false);
        }
      }
    };

    checkAuthStatus();

    return () => controller.abort();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-background">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex justify-center items-center flex-col">
      <div className="absolute top-4 right-4 m-2">
        <ModeToggle />
      </div>
      <main className="w-full max-w-md px-4">
        <Card className="flex justify-center w-full shadow-[0_0_20px_10px_rgba(0,0,0,0.3)] border-0 bg-card/95 dark:bg-emerald-950/15 backdrop-blur-xl shadow-emerald-900/15 pulse-glow p-4">
          <CardHeader>
            <div className="flex justify-center w-auto">
              <GraduationCap
                className="bg-green-600 p-4 rounded-lg text-white"
                size={75}
              />
            </div>
            <CardTitle className="text-3xl font-bold p-4 text-emerald-400 flex justify-center h-20">
              <img src={logo} alt="Logotipo Notifica" />
            </CardTitle>
            <CardDescription className="text-xl flex justify-center text-center mb-4">
              Sistema integrado de comunicação acadêmica
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center flex-col items-center">
            {aviso.mensagem && (
              <div
                className={`mb-4 p-3 rounded text-sm font-medium text-center w-full ${
                  aviso.tipo === 'erro'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {aviso.mensagem}
              </div>
            )}

            <Button
              onClick={handleSuapLogin}
              className="w-full bg-emerald-50/5 hover:bg-emerald-50 text-emerald-600 font-extrabold ring-2 dark:hover:bg-emerald-950 ring-emerald-300/40 text-xl p-6"
            >
              Logar com SUAP
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}