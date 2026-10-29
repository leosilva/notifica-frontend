import { Button } from '@base-ui/react';
import { Eye, MapPin, Pencil, Send, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { use, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function TabelaComunicados({ dados = [] }) {
  const [user, setUser] = useState(Object);

  const actionButtonStyle = `flex items-center justify-center gap-1 text-white py-1.5 px-3 rounded-[6px] transition-all duration-300 active:scale-95 text-xs font-medium`;

  if (!Array.isArray(dados) || dados.length === 0) {
    return (
      <div className="rounded-md border bg-white/20 dark:bg-black/30 p-8 text-center text-gray-500 dark:text-gray-400">
        Nenhum comunicado encontrado ou dados indisponíveis.
      </div>
    );
  }
  const fetchDelete = async (id) => {
    try {
      const response = await apiFetch(`/noticias/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao deletar comunicado');
      }

      alert('Comunicado excluído com sucesso!');

        window.location.reload();
    } catch (error) {
      console.error('Erro na requisição de exclusão:', error);
      alert(`Não foi possível excluir: ${error.message}`);
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <div className="rounded-md border bg-white/20 dark:bg-black/30 overflow-hidden">
      <Table>
        <TableHeader className="bg-emerald-50 dark:bg-emerald-900">
          <TableRow>
            <TableHead className="font-bold">Título</TableHead>
            <TableHead className="font-bold">Setor</TableHead>
            <TableHead className="font-bold">Autor</TableHead>
            <TableHead className="font-bold">Criação</TableHead>
            <TableHead className="font-bold">Publicação</TableHead>
            <TableHead className="text-right font-bold">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dados.map((item, index) => {
            const titulo = item.titulo || 'Título não informado';
            const setor = item.setor || 'DIAC';
            const autorNome =
              item.autor?.nome || item?.nome || 'Autor desconhecido';
            const criadoEm = item.criado_em || 'Data desconhecida';
            const templateFundo = item.template || item.gradiente || '#18181b';
            const corpo = item.corpo || 'Sem conteúdo cadastrado.';

            return (
              <TableRow
                key={item.id || index}
                className="group hover:bg-emerald-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <TableCell className="font-medium">{titulo}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {setor}
                  </span>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400 break-words">
                  {user.nome}
                </TableCell>
                <TableCell>{criadoEm}</TableCell>
                <TableCell>
                  <span
                    className={
                      item.visibilidade !== 'publicada'
                        ? 'text-amber-600 font-semibold'
                        : ''
                    }
                  >
                    {item.visibilidade !== 'publicada' ? 'Pendente' : criadoEm}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      className={`${actionButtonStyle} bg-emerald-400 hover:bg-emerald-600 shadow-sm`}
                    >
                      <Send className="h-3.5 w-3.5" /> Publicar
                    </Button>
                    <Link
                      to="/editar"
                      state={{
                        mensagem: corpo,
                        template: templateFundo,
                        titulo: titulo,
                        id: item.id,
                      }}
                    >
                      <Button
                        className={`${actionButtonStyle} bg-amber-300 hover:bg-amber-400 shadow-sm`}
                      >
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </Button>
                    </Link>

                    <Dialog>
                      <DialogTrigger render={<div />} nativeButton={true}>
                        <Button
                          className={`${actionButtonStyle} bg-blue-400 hover:bg-blue-500 shadow-sm`}
                        >
                          <Eye className="h-3.5 w-3.5" /> Ver
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-5xl w-[95vw]">
                        <DialogHeader>
                          <DialogTitle>Visualização Ampliada</DialogTitle>
                        </DialogHeader>
                        <div
                          className="relative h-137.5 w-full rounded-lg overflow-hidden border flex items-center justify-center shadow-inner"
                          style={{ background: templateFundo }}
                        >
                          <div className="absolute inset-0 bg-black/5" />
                          <div className="relative z-10 w-full max-w-3xl px-6">
                            <div className="bg-gray-900 rounded-xl p-10 shadow-2xl flex flex-col gap-5 border border-white/5 w-full">
                              <div className="flex items-center justify-center gap-3 shrink-0">
                                <MapPin className="h-6 w-6 text-amber-100/80" />
                                <span className="font-bold text-amber-100/90 text-lg uppercase tracking-widest">
                                  {setor}
                                </span>
                              </div>
                              <h3 className="font-bold text-gray-100 text-center leading-tight text-3xl">
                                {titulo}
                              </h3>
                              <p className="text-gray-400 text-center text-xl leading-relaxed px-4">
                                {corpo}
                              </p>
                              <div className="border-t border-gray-800 mt-6 pt-6 text-center">
                                <span className="text-gray-500 text-base font-medium italic">
                                  Autor: {user.nome}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger render={<span />} nativeButton={true}>
                        <Button
                          className={`${actionButtonStyle} bg-red-500 hover:bg-red-600 shadow-sm`}
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent size="sm">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-extrabold text-xl p-2 text-red-600">
                            Atenção!
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-sm">
                            Você deseja realmente apagar o comunicado{' '}
                            <strong>"{titulo}"</strong>? Esta ação é definitiva.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="w-full flex justify-center gap-3 mt-4">
                          <AlertDialogCancel variant="outline">
                            Não, cancelar
                          </AlertDialogCancel>
                          <AlertDialogAction variant="destructive" onClick={() => fetchDelete(item.id)}>
                            Sim, excluir
                          </AlertDialogAction>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
