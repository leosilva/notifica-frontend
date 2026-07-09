import { Funnel, Undo2, Square, TableProperties } from 'lucide-react';
import { Header, PageButton, AnnouncementCard } from '../components';
import { Input } from '@/components/ui/input';
import { useCallback, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../components/ui/dropdown-menu';
import { AnnouncementTable } from '../components';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '../components/ui/button';

export function ComunicationPage() {
  const fetchNews = useCallback(async () => {
    try {
      // O nome da rota não corresponde com a realidade, mas o dado precisa fazer sentido para o seu uso
      const response = await fetch('http://localhost:8000/api/postagem/', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzgzMzU5ODE0LCJpYXQiOjE3ODI0OTU4MTQsImp0aSI6ImQ4MGQ2ZmE5ZDdhNDRmNDdhNzk5MjQ4Yzk1NThkOGZhIiwidXNlcl9pZCI6IjEifQ.tl3N-izOL60HWlkKxSvbuxta81UZUDZqiuXw-oXy3u4`,
          'content-type': 'aplication/json',
        },
      });
      const data = await response.json();
      console.log(response);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const [filter, setFilter] = useState();
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [data, setData] = useState([]);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzgzMzYxMTcwLCJpYXQiOjE3ODI0OTcxNzAsImp0aSI6IjMwYmE5ODFkNGJjYzRkMzg4MGYzMGI5NDkwYjYyN2YwIiwidXNlcl9pZCI6IjEifQ.13K2ZOIWMV26VvXRWQ2On1dWJZ8fVTZkiEL5EZW-nlA';

  const handleAnnouncement = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/api/postagem/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleAnnouncement();
  }, [handleAnnouncement]);

  return (
    <div className="w-full h-auto min-h-screen bg-linear-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-600/20 dark:via-emerald-600/10 dark:to-teal-600/5 relative overflow-hidden flex-col">
      <Header frase="Seus comunicados" />
      <main className="mx-auto sm:w-[90%] h-full p-4">
        <div className="bg-teal-50/60 dark:bg-emerald-950 rounded-2xl my-6 w-full p-6 shadow-sm shadow-emerald-900/10">
          <div className="py-6 justify-between flex flex-row items-center">
            <div className="flex flex-row gap-2 items-center">
              <PageButton to=".." frase="" icon={<Undo2 />} />
              <h2 className="font-bold text-2xl text-black/30 dark:text-emerald-600">
                Comunicados
              </h2>
            </div>
            <div className="flex flex-row items-center gap-3">
              <ButtonGroup>
                <Button
                  variant={viewMode === 'cards' ? 'secondary' : 'outline'}
                  onClick={() => setViewMode('cards')}
                >
                  <Square />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'secondary' : 'outline'}
                  onClick={() => setViewMode('table')}
                >
                  <TableProperties />
                </Button>
              </ButtonGroup>
              <Input
                placeholder="digite o nome do comunicado"
                className="w-80 dark:text-amber-50"
              />
              <DropdownMenu>
                <DropdownMenuTrigger render={<span />}>
                  <div className="ring-1 dark:ring-white/20 ring-emerald-400 text-emerald-800 dark:text-amber-50 hover:ring-2 transition-all duration-200 rounded-sm flex justify-center items-center bg-emerald-100/20 dark:bg-emerald-700 p-1">
                    <Funnel />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Filtrar comunicados</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={filter}
                      onValueChange={setFilter}
                    >
                      <DropdownMenuRadioItem value={'recente'}>
                        Recentes
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={'antigo'}>
                        Antigos
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={'publicados'}>
                        Publicados
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={'rascunhos'}>
                        Rascunhos
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {viewMode === 'cards' ? (
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-3 h-full items-start">
              {data.map((item) => (
                <AnnouncementCard key={item.id} announcement={item} />
              ))}
            </div>
          ) : (
            <div className="w-full my-2">
              <AnnouncementTable dados={data} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
