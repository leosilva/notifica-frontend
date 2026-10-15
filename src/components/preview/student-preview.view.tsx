import { Eye, MessageSquare } from 'lucide-react';
import { memo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

interface Types {
  message: string;
  template: string;
}
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
  cpf: '712.799.554-06',
  data_de_nascimento: '2009-11-18',
  sexo: 'M',
  passaporte: '',
};
const preview = memo(({ message, template }: Types) => {
  return (
    <Card className="xl:col-span-2 bg-card/80 border-0 dark:bg-emerald-950 mt-2 transform-gpu">
      <CardHeader className="pb-6  ">
        <CardTitle className="flex items-center gap-3 text-xl place-content-between">
          <div className="flex flex-row items-center gap-4">
            <div
              className="p-2 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #00b4a6, #008b7a)',
              }}
            >
              <Eye className="h-5 w-5 text-white" />
            </div>
            Pré-visualização
          </div>
        </CardTitle>
        <CardDescription className="text-base">
          Veja como seu comunicado será exibido
        </CardDescription>
        <CardContent>
          <div
            className="relative h-80 rounded-2xl overflow-hidden border-2 border-transparent shadow-inner mt-6"
            style={{ background: template, opacity: 0.7 }}
          >
            <div className={`absolute inset-0 `} />
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="text-center max-w-lg w-full">
                <div className="bg-gray-900/30 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-black/5">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #00b4a6, #008b7a)',
                      }}
                    >
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-100">
                    Comunicado Estudantil
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6 wrap-break-word hyphens-auto overflow-wrap-anywhere max-w-full">
                    {message ||
                      'Sua mensagem aparecerá aqui... Digite algo inspirador!'}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={dados.foto} alt="img" />
                      <AvatarFallback className="text-xs">oi</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Por: {dados.nome}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
});

export default preview;
