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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { MapPin } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Megaphone, PaletteIcon, Save, Send } from 'lucide-react';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Upload } from '../upload';
import { Input } from '../ui/input';

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

const SECTORS = [
  { value: 'biblioteca', label: 'Biblioteca' },
  { value: 'ginasio', label: 'Ginásio' },
  { value: 'vivencia', label: 'Vivência' },
  { value: 'refeitorio', label: 'Refeitório' },
  { value: 'laboratorio', label: 'Laboratório' },
  { value: 'auditorio', label: 'Auditório' },
  { value: 'secretaria', label: 'Secretaria' },
  { value: 'coordenacao', label: 'Coordenação' },
  { value: 'direcao', label: 'Direção' },
  { value: 'manutencao', label: 'Manutenção' },
];

interface Types {
  message: string;
  setMessage: (value: string) => void;
  template: string;
  setTemplate: (value: string) => void;
  selectedSector: string;
  setSelectedSector: (value: string) => void;
  uploadedImage: File | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
  title: string;
  setTitle: (value: string) => void;
  id: number | null;
}

const token = localStorage.getItem('access_token');

const AdminMessageArea = memo(
  ({
    message,
    setMessage,
    template,
    setTemplate,
    selectedSector,
    setSelectedSector,
    uploadedImage,
    setUploadedImage,
    title,
    setTitle,
    id,
  }: Types) => {
    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      if (value.length <= 150) {
        setMessage(value);
        console.log(uploadedImage);
      }
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.length <= 50) {
        setTitle(value);
      }
    };

    const createFormData = (isAvailable: boolean) => {
      const formData = new FormData();

      formData.append(
        'titulo',
        title === '' ? 'Comunicado Administrativo' : title
      );
      formData.append('corpo', message);
      formData.append('gradiente_fundo', template);
      formData.append('disponivel', String(isAvailable));

      if (uploadedImage) {
        formData.append('imagem', uploadedImage);
      }

      return formData;
    };

    const fetchPublished = async () => {
      try {
        await fetch('http://localhost:8000/api/postagem/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: createFormData(true),
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaved = async () => {
      try {
        await fetch('http://localhost:8000/api/postagem/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: createFormData(false),
        });
      } catch (error) {
        console.log(error);
      }
    };

    const updatePublished = async (postId: number) => {
      try {
        await fetch(`http://localhost:8000/api/postagem/${postId}/`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: createFormData(true),
        });
      } catch (error) {
        console.log(error);
      }
    };

    const updateSaved = async (postId: number) => {
      try {
        await fetch(`http://localhost:8000/api/postagem/${postId}/`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: createFormData(false),
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const removeImage = () => {
      setUploadedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleSaveAction = async () => {
      if (message === '') {
        toast.error('digite algo antes de publicar');
        return;
      }

      if (id !== null) {
        await updateSaved(id);
        toast.success('mensagem atualizada com sucesso');
      } else {
        await fetchSaved();
        toast.success('mensagem salva com sucesso');
      }

      setMessage('');
      setTitle('');
      removeImage();
    };

    const handlePublishAction = async () => {
      if (message === '') {
        toast.error('digite algo antes de publicar');
        return;
      }

      if (id !== null) {
        await updatePublished(id);
        toast.success('mensagem atualizada e publicada com sucesso');
      } else {
        await fetchPublished();
        toast.success('mensagem publicada com sucesso');
      }

      setMessage('');
      setTitle('');
      removeImage();
    };

    const Templates = useMemo(() => {
      return TEMPLATES.map((info) => {
        const isSelected = template === info.color;

        return (
          <button
            type="button"
            key={info.id}
            onClick={() => {
              setTemplate(info.color);
              removeImage();
            }}
            className={`relative flex w-full h-10 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group border outline-none cursor-pointer overflow-hidden ${
              isSelected
                ? 'border-emerald-500 shadow-sm ring-2 ring-emerald-500/20 z-10'
                : 'border-black/5 hover:border-black/20 dark:hover:border-white/20'
            }`}
            style={{ background: info.color }}
          >
            <div className="absolute inset-0 bg-black/15 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
              <span className="text-white font-medium text-xs tracking-wide text-center px-2 truncate group-hover:scale-105 transition-transform duration-200">
                {info.label}
              </span>
            </div>
          </button>
        );
      });
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    }, [template, setTemplate, removeImage]);

    return (
      <Card className="lg:w-full bg-teal-50 dark:bg-emerald-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl place-content-between">
            <div className="flex flex-row items-center gap-4">
              <div
                className="p-2 rounded-lg"
                style={{
                  background: 'linear-gradient(135deg, #00b4a6, #008b7a)',
                }}
              >
                <Megaphone className="h-5 w-5 text-white" />
              </div>
              Comunicado
            </div>
          </CardTitle>
          <CardDescription>Mensagem e setor de destino</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sector">Setor</Label>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger id="sector">
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                {SECTORS.map((sector) => (
                  <SelectItem key={sector.value} value={sector.value}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {sector.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-3">
            <Label className="py-2">Plano de fundo:</Label>

            <Upload
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />

            <div className="flex flex-col gap-2 items-start">
              <span className="text-sm text-zinc-500 font-medium pl-1">ou</span>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="outline-none border-none ring-0"
                  asChild
                >
                  <Button
                    className="p-2  bg-teal-50/10 hover:bg-teal-100/20 text-black/70 dark:text-emerald-50"
                    variant="outline"
                  >
                    Selecione um template
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuContent className="w-xl max-w-[95vw] bg-popover/95 backdrop-blur-sm border border-border p-2 rounded-xl shadow-xl">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="pb-2 pt-1 text-xs font-semibold text-black/40 dark:text-white/40 text-center tracking-wider uppercase">
                        Escolha o template para a sua mensagem
                      </DropdownMenuLabel>

                      <DropdownMenuRadioGroup
                        value={template}
                        onValueChange={setTemplate}
                        className="grid grid-cols-3 gap-2 p-1"
                      >
                        {Templates}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </div>
          </div>
          <div>
            <Label className="py-2">Titulo</Label>
            <Input
              className="w-full border border-black/15 p-1 bord rounded-sm focus-visible:border-amber-50 "
              value={title}
              onChange={handleTitleChange}
              id="titulo"
              type="text"
              placeholder="digite o titulo de seu comunicado"
            ></Input>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-message">Mensagem</Label>
            <Textarea
              id="admin-message"
              placeholder="Digite o comunicado administrativo..."
              value={message}
              onChange={handleMessageChange}
              className="min-h-30 resize-none"
              maxLength={150}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Caracteres restantes:</span>
              <span className={message.length > 130 ? 'text-orange-500' : ''}>
                {150 - message.length}
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-around">
            <Button
              className="w-[50%] bg-emerald-700/80 font-semibold text-emerald-50 text-xl p-6 flex items-center justify-center"
              onClick={handleSaveAction}
            >
              <Save className="text-emerald-50 h-full mr-2" />
              Salvar Comunicado
            </Button>
            <Button
              className="w-[50%] bg-emerald-700 font-semibold text-lg p-6 text-emerald-50 flex items-center justify-center"
              onClick={handlePublishAction}
            >
              <Send className="mr-2" />
              Salvar e Publicar Comunicado
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);
export default AdminMessageArea;