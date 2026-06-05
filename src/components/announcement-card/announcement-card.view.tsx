import { Eye, MapPin, Save, Trash } from 'lucide-react';
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

export default function AnnouncementCard({ template, image, message, title }) {
  const bubbleButtonStyle = ` flex flex-row items-center justify-center gap-1 text-white bg-[#7d2ae8]
  py-[10px] rounded-[6px] 
  transition-all duration-300 active:scale-100
  `;

  return (
    <Card className="group mt-8 transform-gpu transition-colors duration-300 bg-white/30 dark:bg-emerald-500/20 hover:bg-taupe-200/20">
      <CardHeader>
        <CardTitle>Comunicado 1</CardTitle>
      </CardHeader>
      <CardContent className="py-4 group-hover:py-2 transition-all duration-300 ease-in-out">
        <div
          className="relative h-48 w-full rounded-lg overflow-hidden border flex items-center justify-center shadow-inner"
          style={{ background: template }}
        >
          <div className="absolute inset-0 bg-black/5" />

          <div className="relative z-10 w-full max-w-55">
            {image !== 'nada' ? (
              <div className="relative w-full h-full p-2">
                <img
                  src={image}
                  alt="Upload Preview"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="bg-gray-900 rounded-md p-2 shadow-lg flex flex-col gap-1.5 border border-white/5">
                <div className="flex items-center justify-center gap-1 shrink-0">
                  <MapPin className="h-2.5 w-2.5 text-amber-100/80" />
                  <span className="font-bold text-amber-100/90 text-[10px] uppercase tracking-tighter">
                    Setor
                  </span>
                </div>

                <h3 className="font-bold text-gray-100 text-center leading-tight text-[11px]">
                  {title}
                </h3>
                <p className="text-gray-400 text-center wrap-break-word text-[10px] line-clamp-2 leading-snug">
                  {message}
                </p>

                <div className="border-t border-gray-800 mt-0.5 pt-1.5 text-center">
                  <span className="text-gray-500 text-[9px] font-medium italic">
                    Administração: teste
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <CardFooter className="bg-transparent border-0 p-0 gap-1 grid grid-cols-3 overflow-hidden transition-all duration-300 ease-in-out opacity-0 max-h-0 group-hover:max-h-20 group-hover:opacity-100 group-hover:py-2 group-hover:mt-2">
          <Link
            to="/"
            state={{
              mensagem: `${message}`,
              template: `${template}`,
              titulo: `${title}`,
            }}
            className="w-full h-full"
          >
            <Button className={`${bubbleButtonStyle} w-full bg-emerald-400`}>
              <Save /> Editar
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger
              render={<div />}
              nativeButton={true}
              className="h-full"
            >
              <Button
                className={` ${bubbleButtonStyle} h-full w-full bg-blue-400`}
              >
                <Eye /> Visualizar
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-5xl w-[95vw]">
              <DialogHeader>
                <DialogTitle>Visualização Ampliada</DialogTitle>
              </DialogHeader>

              <div
                className="relative h-137.5 w-full rounded-lg overflow-hidden border flex items-center justify-center shadow-inner"
                style={{ background: template }}
              >
                <div className="absolute inset-0 bg-black/5" />

                <div className="relative z-10 w-full max-w-3xl px-6">
                  {image !== 'nada' ? (
                    <div className="relative w-full h-full p-4">
                      <img
                        src={image}
                        alt="Upload Preview"
                        className="w-full h-full object-contain rounded-md shadow-lg"
                      />
                    </div>
                  ) : (
                    <div className="bg-gray-900 rounded-xl p-10 shadow-2xl flex flex-col gap-5 border border-white/5 w-full">
                      <div className="flex items-center justify-center gap-3 shrink-0">
                        <MapPin className="h-6 w-6 text-amber-100/80" />
                        <span className="font-bold text-amber-100/90 text-lg uppercase tracking-widest">
                          Setor
                        </span>
                      </div>

                      <h3 className="font-bold text-gray-100 text-center leading-tight text-3xl">
                        {title}
                      </h3>

                      <p className="text-gray-400 text-center wrap-break-word text-xl line-clamp-6 leading-relaxed px-4">
                        {message}
                      </p>

                      <div className="border-t border-gray-800 mt-6 pt-6 text-center">
                        <span className="text-gray-500 text-base font-medium italic">
                          Administração: teste
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger
              render={<span />}
              nativeButton={true}
              className="h-full"
            >
              <Button
                className={` ${bubbleButtonStyle} h-full w-full bg-red-500`}
              >
                <Trash />
                Excluir
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
                <AlertDialogAction variant="destructive">
                  Sim, excluir
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
