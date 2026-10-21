import { GraduationCap } from 'lucide-react';
import { API_BASE_URL } from '@/constants/environments';
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
export function LoginPage() {
  const SuapLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/suap/login`
  }
  const { Suap, aviso } = useLogin();
  return (
    <div className="relative w-full h-screen flex justify-center items-center flex-col">
      <div className="absolute top-4 right-4 m-2">
        <ModeToggle />
      </div>
      <main className="w-[30%]">
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
            <CardDescription className="text-xl flex justify-center mb-4">
              Sistema integrado de comunicação acadêmica
            </CardDescription>
          </CardHeader>
          <CardContent className='flex justify-center'>
            {aviso.mensagem && (
              <div
                className={`mb-4 p-3 rounded text-sm font-medium text-center ${
                  aviso.tipo === 'erro'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {aviso.mensagem}
              </div>
            )}

            <Button onClick={SuapLogin} className="bg-emerald-50/5 hover:bg-emerald-50 text-emerald-600 font-extrabold ring-2 dark:hover:bg-emerald-950 ring-emerald-300/40 text-2xl p-6">Logar com SUAP</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
