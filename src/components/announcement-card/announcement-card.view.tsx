import { Eye, MapPin, Save, Trash, Send, Pencil } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '@base-ui/react';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../ui/alert-dialog';
import { Link } from 'react-router';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

export default function AnnouncementCard({ announcement, onUpdate }) {
  const token = localStorage.getItem('access_token');

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const fetchDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/postagem/${announcement.id}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao deletar comunicado');
      }

      alert('Comunicado excluído com sucesso!');

      setIsAlertOpen(false);

      if (onUpdate) {
        onUpdate();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
      alert(`Não foi possível excluir: ${error.message}`);
    }
  };

  const bubbleButtonStyle = ` flex flex-row items-center justify-center gap-1 text-white bg-[#7d2ae8]
  py-[10px] rounded-[6px] 
  transition-all duration-300 active:scale-100
  `;

  return (
    <Card
      className={
        ' mt-8 transform-gpu transition-colors duration-300 bg-white/30 dark:bg-emerald-500/20 hover:bg-taupe-200/20'
      }
    >
      <CardHeader>
        <CardTitle>Comunicado {announcement.id}</CardTitle>
      </CardHeader>
      <CardContent className="py-2 group-hover:py-2 transition-all duration-300 ease-in-out">
        <div
          className="relative h-48 w-full rounded-lg overflow-hidden flex items-center justify-center shadow-inner"
          style={{
            background: announcement.gradiente_fundo,
          }}
        >
          <div className="absolute inset-0 bg-black/5" />

          <div className="relative z-10 w-full max-w-55">
            {announcement.imagem ? (
              <div className="relative w-full h-full p-2">
                <img
                  src={announcement.imagem}
                  alt="Upload Preview"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="bg-gray-900/20 rounded-md p-2 shadow-lg flex flex-col gap-1.5 ">
                <div className="flex items-center justify-center gap-1 shrink-0">
                  <MapPin className="h-2.5 w-2.5 text-amber-100/80" />
                  <span className="font-bold text-amber-100/90 text-[10px] uppercase tracking-tighter">
                    {announcement.setor || 'setor'}
                  </span>
                </div>

                <h3 className="font-bold text-gray-100 text-center leading-tight text-[11px] break-words">
                  {announcement.titulo}
                </h3>
                <p className="text-gray-400 text-center wrap-break-word text-[10px] line-clamp-2 leading-snug">
                  {announcement.corpo}
                </p>

                <div className="border-t mt-0.5 pt-1.5 text-center flex flex-col">
                  <span className="text-gray-400 text-[9px] font-medium italic">
                    Administração: {announcement.usuario?.nome || 'Admin'}
                  </span>
                  <span className="text-gray-400 text-[9px] font-medium italic">
                    {announcement.publicado_em || 'Recente'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <CardFooter className="bg-transparent border-0 p-0 gap-1 grid grid-cols-4 overflow-hidden transition-all duration-300 ease-in-out max-h-20 opacity-100 py-2 mt-2">
          <Button
            title="Publicar"
            className={`${bubbleButtonStyle} w-full h-full bg-emerald-400`}
          >
            <Send size={20} />
          </Button>

          <Link
            to="/admin"
            state={{
              titulo: announcement.titulo,
              corpo: announcement.corpo,
              template: announcement.gradiente_fundo,
              id: announcement.id,
            }}
            className="w-full h-full"
            title="Editar comunicado"
          >
            <Button className={`${bubbleButtonStyle} w-full bg-amber-300`}>
              <Pencil size={20} />
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger
              render={<div />}
              nativeButton={true}
              className="h-full"
            >
              <Button
                title="Visualizar comunicado"
                className={` ${bubbleButtonStyle} h-full w-full bg-blue-400`}
              >
                <Eye size={20} />
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-5xl w-[95vw]">
              <DialogHeader>
                <DialogTitle>Visualização Ampliada</DialogTitle>
              </DialogHeader>

              <div
                className="relative h-137.5 w-full rounded-lg overflow-hidden border flex items-center justify-center shadow-inner"
                style={{
                  background: announcement.gradiente_fundo,
                }}
              >
                <div className="absolute inset-0 bg-black/5" />

                <div className="relative z-10 w-full max-w-3xl px-6">
                  {announcement.imagem ? (
                    <div className="relative w-full h-full p-4">
                      <img
                        src={announcement.imagem}
                        alt="Upload Preview"
                        className="w-full h-full object-contain rounded-md shadow-lg"
                      />
                    </div>
                  ) : (
                    <div className="bg-black-900/20 rounded-xl p-10 shadow-2xl flex flex-col gap-5 border border-white/5 w-full">
                      <div className="flex items-center justify-center gap-3 shrink-0">
                        <MapPin className="h-6 w-6 text-amber-100/80" />
                        <span className="font-bold text-amber-100/90 text-lg uppercase tracking-widest">
                          {announcement.setor || 'Setor'}
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-100 text-center leading-tight text-3xl break-words">
                        {announcement.titulo}
                      </h3>

                      <p className="text-gray-400 text-center wrap-break-word text-xl line-clamp-6 leading-relaxed px-4">
                        {announcement.corpo}
                      </p>

                      <div className="text-sm text-gray-400 border-t pt-3 text-center">
                        <div>
                          Administração: {announcement.usuario?.nome || 'Admin'}
                        </div>
                        <div className="text-xs mt-1">
                          {announcement.publicado_em || 'Recente'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogTrigger
              render={<span />}
              nativeButton={true}
              className="h-full"
            >
              <Button
                title="Excluir comunicado"
                className={` ${bubbleButtonStyle} h-full w-full bg-red-500`}
              >
                <Trash size={20} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-extrabold text-xl p-2">
                  Atenção!
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm">
                  Você deseja realmente apagar esse comunicado? Uma vez
                  excluído, não será possível recuperá-lo.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="w-full flex justify-center gap-3">
                <AlertDialogCancel variant="outline">Não</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={fetchDelete}>
                  Sim, excluir
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
        <p
          className={`text-right text-[11px] italic ${
            announcement.disponivel === false
              ? 'text-amber-600 font-semibold'
              : ''
          }`}
        >
          {announcement.disponivel ? (
            <span className="text-emerald-600 non-italic not-italic">
              Publicado em:{' '}
            </span>
          ) : (
            'Ainda não publicado'
          )}
          {announcement.disponivel && announcement.publicado_em}
        </p>
      </CardContent>
    </Card>
  );
}
