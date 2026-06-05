import { Funnel, Undo2 } from 'lucide-react';
import { Header, PageButton, AnnouncementCard } from '../components';
import { Input } from '@/components/ui/input';
import { use, useCallback, useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '../components/ui/dropdown-menu';
import { Table } from '@/components/ui/table';
import { AnnouncementTable } from '../components';

export function ComunicationPage() {
  const [filter, setFilter] = useState();
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc3Mzg0NzMxLCJpYXQiOjE3NzY1MjA3MzEsImp0aSI6ImZiYTZkZTJjOTcwYjQwZDk5ZGQ0MWFjN2I4OGQzMWVjIiwidXNlcl9pZCI6IjEifQ.ui083fsK4xFIf0PuKSh1Fk_xn8i_mZt2KcsS0CuNn28';
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
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleAnnouncement();
  }, [handleAnnouncement]);
  return (
    <div className="w-full h-auto min-h-screen bg-linear-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-600/20 dark:via-emerald-600/10 dark:to-teal-600/5 relative overflow-hidden-   flex-col">
      <Header frase="Seus comunicados" />
      <main className=" mx-auto  sm:w-[90%]  h-full p-4">
        <div className=" bg-teal-50/60 dark:bg-emerald-950 rounded-2xl my-6 w-full p-6 shadow-sm shadow-emerald-900/10">
          <div className="py-6 justify-between flex flex-row items-center">
            <div className="flex flex-row gap-2 items-center">
              <PageButton to=".." frase="" icon={<Undo2 />} />
              <h2 className="font-bold text-2xl text-black/30 dark:text-emerald-600 ">
                Comunicados
              </h2>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Input
                placeholder="digite o nome do comunicado"
                className="w-80 dark:text-amber-50"
              ></Input>
              <DropdownMenu>
                <DropdownMenuTrigger render={<span />}>
                  <div className="ring-1 dark:ring-white/20 ring-emerald-400 text-emerald-800 dark:text-amber-50 hover:ring-2 transition-all duration-200   rounded-sm flex justify-center items-center bg-emerald-100/20 dark:bg-emerald-700 p-1">
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
          <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-3 h-full items-start  ">
            <AnnouncementCard
              image={'nada'}
              template={
                'linear-gradient(135deg, rgb(51, 65, 85), rgb(15, 23, 42))'
              }
              message={'testizinho'}
              title={'Hellos my friend'}
            />
            <AnnouncementCard
              image={'nada'}
              template={
                'linear-gradient(135deg, rgb(51, 65, 85), rgb(15, 23, 42))'
              }
              message={'testizinho'}
              title={'Hello my friend'}
            />
            <AnnouncementCard
              image={'nada'}
              template={
                'linear-gradient(135deg, rgb(51, 65, 85), rgb(15, 23, 42))'
              }
              message={'testizinho'}
              title={'Hello my friend'}
            />
            <AnnouncementCard
              image={'nada'}
              template={
                'linear-gradient(135deg, rgb(51, 65, 85), rgb(15, 23, 42))'
              }
              message={'testizinho'}
              title={'Hello my friend'}
            />
          </div>
          <div className="w-full my-2">
            <AnnouncementTable />
          </div>
        </div>
      </main>
    </div>
  );
}
