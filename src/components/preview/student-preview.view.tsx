import { Eye, MessageSquare } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
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
  nome: string;
  foto: string;
}

const preview = memo(({ message, template, foto, nome }: Types) => {
  const [user, setUser] = useState(Object);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);
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
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-300 text-xl leading-relaxed mb-6 wrap-break-word hyphens-auto overflow-wrap-anywhere max-w-full">
                    {message ||
                      'Sua mensagem aparecerá aqui... Digite algo inspirador!'}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400 border-t border-white/10 p-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={foto} alt="img" />
                      <AvatarFallback className="text-xs">oi</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Por: {user.nome}</span>
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
