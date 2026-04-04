import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../ui/card';
import { Label } from '../ui/label';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
} from '../ui/dropdown-menu';
import { Textarea } from '../ui/textarea';
import { MessageSquare, User, Send, PaletteIcon } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { memo, useMemo } from 'react';

const TEMPLATES = [
  {
    id: 'SUAP',
    label: 'SUAP OFICIAL',
    color: 'linear-gradient(135deg, rgb(0, 180, 166), rgb(0, 139, 122))',
  },
  {
    id: 'Oceano',
    label: 'Azul Oceano',
    color: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(29, 78, 216))',
  },
  {
    id: 'Floresta',
    label: 'Verde Floresta',
    color: 'linear-gradient(135deg, rgb(34, 197, 94), rgb(21, 128, 61))',
  },
  {
    id: 'Laranja',
    label: 'Laranja Pôr do Sol',
    color: 'linear-gradient(135deg, rgb(251, 146, 60), rgb(239, 68, 68))',
  },
  {
    id: 'Roxa',
    label: 'Galáxia Roxa',
    color: 'linear-gradient(135deg, rgb(168, 85, 247), rgb(124, 58, 237))',
  },
  {
    id: 'Rosa',
    label: 'Rosa Suave',
    color: 'linear-gradient(135deg, rgb(244, 114, 182), rgb(244, 63, 94))',
  },
  {
    id: 'Dourado',
    label: 'Dourado',
    color: 'linear-gradient(135deg, rgb(250, 204, 21), rgb(249, 115, 22))',
  },
  {
    id: 'Midnight',
    label: 'Azul Meia-Noite',
    color: 'linear-gradient(135deg, rgb(51, 65, 85), rgb(15, 23, 42))',
  },
];
interface Types {
  message: string;
  setMessage: (value: string) => void;
  template: string;
  setTemplate: (value: string) => void;
}
const StudentMessageArea = memo(
  ({ message, setMessage, template, setTemplate }: Types) => {
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= 80) {
        setMessage(value);
      }
    };
    const Templates = useMemo(() => {
      return TEMPLATES.map((info) => (
        <DropdownMenuRadioItem value={info.color} key={info.id}>
          <div
            className="flex rounded-xl transition-all duration-300 hover:scale-[1.02] group border-border hover:border-primary/50 w-full h-16"
            style={{ background: info.color }}
          >
            <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold text-xs text-center px-1 group-hover:scale-110 transition-transform duration-300">
                {info.label}
              </span>
            </div>
          </div>
        </DropdownMenuRadioItem>
      ));
    }, []);

    return (
      <Card className="xl:col-span-2 bg-card/80 border-0 dark:bg-emerald-950 transform-gpu">
        <CardHeader className="pb-6  ">
          <CardTitle className="flex items-center gap-3 text-xl place-content-between">
            <div className="flex flex-row items-center gap-4">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #00b4a6, #008b7a)',
                }}
              >
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              Criar Comunicado
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none border-none ring-0">
                <div className="dark:bg-black/20 ring-2 ring-emerald-300 bg-emerald-500 dark:ring-teal-600 rounded-4xl hover:transition-all hover:scale-110 duration-300 hover:ring-4 p-0.5 dark:hover:bg-emerald-800 cursor-pointer">
                  <Tooltip>
                    <TooltipTrigger render={<div />}>
                      <PaletteIcon className="w-8 h-8 text-emerald-50" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-[0.6rem] w-15 font-medium">
                        escolha o seu template
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuPortal>
                <DropdownMenuContent className="w-xl bg-popover/95 border-border">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="p-1.5 text-sm font-bold text-amber-50 text-center">
                      Escolha o template para a sua mensagem:
                    </DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={template}
                      onValueChange={setTemplate}
                      className="grid grid-cols-2 gap-1.5"
                    >
                      {Templates}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </CardTitle>
          <CardDescription className="text-base">
            Compartilhe sua mensagem com a comunidade acadêmica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="message"
              className="text-sm font-semibold flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Sua Mensagem
            </Label>
            <Textarea
              id="message"
              value={message}
              placeholder="Digite sua mensagem aqui... Seja criativo e inspire outros estudantes!"
              className="min-h-35 resize-none border-2 border-border focus:border-primary transition-colors duration-300 rounded-xl text-base dark:bg-black/40"
              maxLength={80}
              onChange={handleMessageChange}
            />
            <div className="flex justify-between items-center text-sm ">
              <span className="text-muted-foreground font-medium">
                Caracteres restantes:
              </span>
              <span
                className={`font-bold ${
                  message.length < 50
                    ? 'text-emerald-200'
                    : message.length > 70
                      ? 'text-orange-500'
                      : message.length > 60
                        ? 'text-yellow-500'
                        : 'text-primary'
                }`}
              >
                {80 - message.length}
              </span>
            </div>
          </div>
          <Button
            className="w-full h-12 font-semibold rounded-xl transition-all duration-300 transform hover:ring-1 hover:dark:ring-emerald-400/90 hover:ring-emerald-700/90 border-0 outline-none dark:bg-emerald-800 bg-emerald-400 hover:bg-emerald-700 dark:hover:bg-emerald-500 text-amber-50"
            type="button"
            onClick={() =>
              message.length === 0
                ? toast.error('Escreva algo antes de enviar')
                : toast.success('Mensagem enviada com sucesso')
            }
          >
            <Send className="mr-2 h-5 w-5 inline text-amber-50" />
            Publicar Comunicado
          </Button>
        </CardContent>
      </Card>
    );
  },
);
export default StudentMessageArea;
