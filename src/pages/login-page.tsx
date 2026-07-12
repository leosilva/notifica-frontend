import { useState } from 'react';
import {
  GraduationCap,
  InfoIcon,
  SearchIcon,
  StarIcon,
  Eye,
  EyeOff,
  User,
  Lock,
} from 'lucide-react';
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
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [showStudentPassword, setShowStudentPassword] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);

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
                <InputGroup>
                  <InputGroupAddon>
                    <User size={20} />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="text"
                    placeholder="Digite a sua matrícula"
                  />
                </InputGroup>

                <InputGroup>
                  <InputGroupAddon>
                    <Lock size={20} />
                  </InputGroupAddon>
                  <InputGroupInput
                    type={showStudentPassword ? 'text' : 'password'}
                    placeholder="Digite a sua senha"
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
              </TabsContent>

              <TabsContent
                value="administrador"
                className="flex flex-col gap-4 mt-4"
              >
                <InputGroup>
                  <InputGroupAddon>
                    <User size={20} />
                  </InputGroupAddon>
                  <InputGroupInput
                    type="text"
                    placeholder="Digite a sua matrícula"
                  />
                </InputGroup>

                <InputGroup>
                  <InputGroupAddon>
                    <Lock size={20} />
                  </InputGroupAddon>
                  <InputGroupInput
                    type={showAdminPassword ? 'text' : 'password'}
                    placeholder="Digite a sua senha"
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
                <Input type="button"></Input>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
