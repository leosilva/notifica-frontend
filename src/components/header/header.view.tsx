import { LogOut } from 'lucide-react';
import { memo } from 'react';
import { toast } from 'sonner';
import { ModeToggle } from '../mode-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { apiFetch } from '@/lib/api';

interface Type {
  frase: string;
}

const Header = memo(({ frase }: Type) => {
  const HandleLogout = async () => {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error(error);
    }

    window.location.href = '/';
  };

  const dados = {
    identificacao: '20251174010015',
    nome_social: '',
    nome_usual: 'Matheus Rodrigues',
    nome_registro: 'Matheus Lemos Rodrigues',
    nome: 'Matheus Rodrigues',
    primeiro_nome: 'Matheus',
    ultimo_nome: 'Rodrigues',
    email: '',
    email_secundario: 'lemosrodriguesmatheus@gmail.com',
    email_google_classroom: 'lemos.matheus@escolar.ifrn.edu.br',
    email_academico: 'matheus.lemos@academico.ifrn.edu.br',
    campus: 'CM',
    foto: 'https://suap.ifrn.edu.br/djtools/arquivo/edu/aluno/68850f85-afbf-4fd3-b2af-5bb059bae27f/foto/75x100/',
    tipo_usuario: 'Aluno',
    email_preferencial: 'lemosrodriguesmatheus@gmail.com',
    cpf: '',
    data_de_nascimento: '',
    sexo: 'M',
    passaporte: '',
  };

  return (
    <header className="relative z-10 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg w-full dark:bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-1 ring-primary/20 ring-offset- ring-offset-background">
                <AvatarImage src={dados.foto} />
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
                Olá, {dados.nome}
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
              onClick={() => {
                toast('desconectado com sucesso');
                HandleLogout();
              }}
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
