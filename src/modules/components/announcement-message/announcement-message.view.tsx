import { Megaphone, Save, Send, Sliders } from 'lucide-react';
import { memo, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from '@/components/upload';
import { useAnnouncementMessage } from './announcement-message.hook';

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

export interface Types {
  message: string;
  setMessage: (value: string) => void;
  template: string;
  setTemplate: (value: string) => void;
  uploadedImage: File | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
  title: string;
  setTitle: (value: string) => void;
  id: number | null;
  opacity: number;
  setOpacity: (value: number) => void;
  url?: string;
  setUrl: (value: string) => void;
}

const AdminMessageArea = memo((props: Types) => {
  const {
    message,
    setMessage,
    template,
    setTemplate,
    uploadedImage,
    setUploadedImage,
    title,
    setTitle,
    id,
    opacity,
    setOpacity,
    url,
    setUrl,
  } = props;

  const {
    removeImage,
    handleMessageChange,
    handleTitleChange,
    handleSubmit,
    isSubmitting,
  } = useAnnouncementMessage({
    setMessage,
    setTitle,
    uploadedImage,
    setUploadedImage,
    id,
  });

  const imageUrl = useMemo(() => {
    if (!uploadedImage) return null;
    return URL.createObjectURL(uploadedImage);
  }, [uploadedImage]);

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
  }, [template, setTemplate, removeImage]);

  return (
    <Card className="lg:w-full bg-[#f4faf7] dark:bg-emerald-950 border border-emerald-900/10 shadow-sm rounded-xl">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div
              className="p-2 rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #00b4a6, #008b7a)',
              }}
            >
              <Megaphone className="h-5 w-5 text-white" />
            </div>
            Comunicado
          </CardTitle>
          <CardDescription className="text-zinc-500 text-sm mt-0.5">
            Mensagem e setor de destino
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Plano de fundo:
            </Label>
            
            <div className="flex flex-wrap items-center gap-4">
              <Upload
                uploadedImage={uploadedImage}
                setUploadedImage={setUploadedImage}
              />

              <div
                className={`flex items-center gap-3 flex-1 min-w-[220px] transition-opacity duration-300 ${
                  uploadedImage
                    ? 'opacity-100'
                    : 'opacity-40 pointer-events-none'
                }`}
              >
                <Sliders className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
                  Opacidade: {opacity}%
                </span>
                <input
                  type="range"
                  name="opacidade"
                  min="0"
                  max="100"
                  value={opacity}
                  disabled={!uploadedImage}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="flex-1 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer accent-teal-600 focus:outline-none"
                />
              </div>

              <span className="text-xs text-zinc-400 font-medium">ou</span>

              <DropdownMenu>
                <DropdownMenuTrigger
                  className="outline-none border-none ring-0"
                  render={
                    <Button
                      type="button"
                      className="px-4 py-2 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 shadow-sm rounded-lg text-sm font-medium transition-colors"
                      variant="outline"
                    />
                  }
                >
                  Selecione um template
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

            {uploadedImage && (
              <div className="relative w-full max-w-sm h-32 rounded-xl overflow-hidden border border-teal-200 dark:border-emerald-700 shadow-md dark:bg-zinc-900">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-150"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    opacity: opacity / 100,
                  }}
                />
                <div
                  className="absolute inset-0 bg-black/20"
                  style={{ opacity: opacity / 100 }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="titulo" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                Título
              </Label>
              <Input
                name="titulo"
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg h-10 px-3 text-sm focus-visible:ring-1 focus-visible:ring-emerald-500"
                value={title}
                onChange={handleTitleChange}
                id="titulo"
                type="text"
                placeholder="digite o título de seu comunicado"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="url" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                URL (opcional)
              </Label>
              <Input
                name="url"
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg h-10 px-3 text-sm focus-visible:ring-1 focus-visible:ring-emerald-500"
                value={url ?? ''}
                onChange={(e) => setUrl(e.target.value)}
                id="url"
                type="text"
                placeholder="digite a url da sua notícia"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="admin-message" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Mensagem
            </Label>
            <Textarea
              name="corpo"
              id="admin-message"
              placeholder="Digite o comunicado administrativo..."
              value={message}
              onChange={handleMessageChange}
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 text-sm min-h-[110px] resize-none focus-visible:ring-1 focus-visible:ring-emerald-500"
              maxLength={150}
            />
            <div className="flex justify-between items-center text-xs text-zinc-500 pt-0.5">
              <span>Caracteres restantes:</span>
              <span className={message.length > 130 ? 'text-orange-500 font-semibold' : ''}>
                {150 - message.length}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="submit"
              name="action"
              value="save"
              disabled={isSubmitting}
              className="flex-1 bg-[#2d9d78] hover:bg-[#258565] text-white font-medium h-12 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Salvando...' : 'Salvar Comunicado'}
            </Button>
            <Button
              type="submit"
              name="action"
              value="publish"
              disabled={isSubmitting}
              className="flex-1 bg-[#0b8559] hover:bg-[#096e49] text-white font-medium h-12 rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Publicando...' : 'Salvar e Publicar Comunicado'}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  );
});

export default AdminMessageArea;

