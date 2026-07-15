import { useState } from 'react';
import { GraduationCap, Eye, EyeOff, User, Lock } from 'lucide-react';
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from '../components/ui/card';
import { ModeToggle } from '../components/mode-toggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import logopng from '../assets/logo.png';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  const [studentMatricula, setStudentMatricula] = useState('');
  const [studentSenha, setStudentSenha] = useState('');

  const [adminMatricula, setAdminMatricula] = useState('');
  const [adminSenha, setAdminSenha] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', tipo: '' });

  const handleLogin = async (tipoUsuario) => {
    setIsLoading(true);
    setAviso({ mensagem: '', tipo: '' });

    let username = '';
    let password = '';

    if (tipoUsuario === 'estudante') {
      username = studentMatricula;
      password = studentSenha;
    } else if (tipoUsuario === 'administrador') {
      username = adminMatricula;
      password = adminSenha;
    }

    try {
      const response = await fetch('http://localhost:8000/api/token/pair/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        setAviso({
          mensagem: 'Login realizado com sucesso! Entrando...',
          tipo: 'sucesso',
        });

        setTimeout(() => {
          window.location.href = window.location.href =
            tipoUsuario === 'estudante' ? '/student' : '/admin';
        }, 1500);
      } else {
        setAviso({
          mensagem:
            data.detail || 'Matrícula ou senha incorretos. Tente novamente.',
          tipo: 'erro',
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setAviso({
        mensagem: 'Erro de conexão. Verifique se o servidor está rodando.',
        tipo: 'erro',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center flex-col">
      <div className="absolute top-4 right-4 m-2">
        <ModeToggle />
      </div>
      <main className="w-[30%]">
        <Card className="flex justify-center w-full shadow-[0_0_20px_10px_rgba(0,0,0,0.3)] border-0 bg-card/95 backdrop-blur-xl shadow-emerald-900/15 pulse-glow p-4">
          <CardHeader>
            <div className="flex justify-center w-auto">
              <GraduationCap
                className="bg-green-500 p-4 rounded-lg text-white"
                size={75}
              />
            </div>
            <CardTitle className="text-3xl font-bold p-4 text-emerald-400 flex justify-center h-20">
              <img src={logopng} alt="Logotipo Notifica" />
            </CardTitle>
            <CardDescription className="text-xl flex justify-center">
              Sistema integrado de comunicação acadêmica
            </CardDescription>
          </CardHeader>
          <CardContent>
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

            <Tabs defaultValue="estudante" className="w-full bg-emerald-50">
              <TabsList className="w-full bg-emerald-50" variant="default">
                <TabsTrigger
                  value="estudante"
                  className="data-[state=inactive]: bg-emerald-100"
                >
                  Estudante
                </TabsTrigger>
                <TabsTrigger
                  value="administrador"
                  className="data-[state=inactive]: bg-emerald-100"
                >
                  Administrador
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="estudante"
                className="flex flex-col gap-4 mt-4"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin('estudante');
                  }}
                  className="flex flex-col gap-4"
                >
                  <InputGroup>
                    <InputGroupAddon>
                      <User size={20} />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="text"
                      placeholder="Digite a sua matrícula"
                      value={studentMatricula}
                      onChange={(e) => setStudentMatricula(e.target.value)}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputGroupAddon>
                      <Lock size={20} />
                    </InputGroupAddon>
                    <InputGroupInput
                      type={showStudentPassword ? 'text' : 'password'}
                      placeholder="Digite a sua senha"
                      value={studentSenha}
                      onChange={(e) => setStudentSenha(e.target.value)}
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <button
                        type="button"
                        onClick={() =>
                          setShowStudentPassword(!showStudentPassword)
                        }
                        className="bg-transparent border-none cursor-pointer flex items-center p-0"
                      >
                        {showStudentPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </InputGroupAddon>
                  </InputGroup>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    {isLoading ? 'Aguarde...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent
                value="administrador"
                className="flex flex-col gap-4 mt-4"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin('administrador');
                  }}
                  className="flex flex-col gap-4"
                >
                  <InputGroup>
                    <InputGroupAddon>
                      <User size={20} />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="text"
                      placeholder="Digite a sua matrícula"
                      value={adminMatricula}
                      onChange={(e) => setAdminMatricula(e.target.value)}
                      required
                    />
                  </InputGroup>

                  <InputGroup>
                    <InputGroupAddon>
                      <Lock size={20} />
                    </InputGroupAddon>
                    <InputGroupInput
                      type={showAdminPassword ? 'text' : 'password'}
                      placeholder="Digite a sua senha"
                      value={adminSenha}
                      onChange={(e) => setAdminSenha(e.target.value)}
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <button
                        type="button"
                        onClick={() => setShowAdminPassword(!showAdminPassword)}
                        className="bg-transparent border-none cursor-pointer flex items-center p-0"
                      >
                        {showAdminPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </InputGroupAddon>
                  </InputGroup>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    {isLoading ? 'Aguarde...' : 'Entrar como Admin'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
