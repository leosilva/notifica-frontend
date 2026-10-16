import { Funnel, Plus, Square, TableProperties, Undo2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AnnouncementCard,
  AnnouncementTable,
  Header,
  PageButton,
} from '@/components';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useListAnnouncements } from './list-announcements.hook';

export function ListAnnouncementsPage() {
  const {
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filteredAndSortedData,
  } = useListAnnouncements();
    
  
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/auth/me', {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Erro na requisição');
        return resposta.json();
      })
      .then((dados) => {
        setData(dados);
      })
      .catch((erro) => {
        console.error('Erro:', erro);
      });
  }, []);


  return (
    <div className="w-full h-auto min-h-screen bg-linear-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-600/20 dark:via-emerald-600/10 dark:to-teal-600/5 relative overflow-hidden flex-col">
      <Header frase="Seus comunicados" nome={data?.nome} foto={data?.foto}/>
      <main className="mx-auto sm:w-[90%] h-full p-4">
        <div className="bg-teal-50/60 dark:bg-emerald-950 rounded-2xl my-6 w-full p-6 shadow-sm shadow-emerald-900/10">
          <div className="py-6 justify-between flex flex-row items-center">
            <div className="flex flex-row gap-2 items-center">
              <h2 className="font-bold text-3xl text-black/30 dark:text-emerald-600">
                Comunicados
              </h2>
            </div>
            <div className="flex flex-row items-center gap-3">
              <ButtonGroup>
                <Button
                  variant={viewMode === 'cards' ? 'secondary' : 'outline'}
                  onClick={() => setViewMode('cards')}
                  className={
                    viewMode === 'cards'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-emerald-50 text-slate-600 hover:bg-slate-100'
                  }
                >
                  <Square />
                </Button>

                <Button
                  variant={viewMode === 'table' ? 'secondary' : 'outline'}
                  onClick={() => setViewMode('table')}
                  className={
                    viewMode === 'table'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-emerald-50 text-slate-600 hover:bg-slate-100'
                  }
                >
                  <TableProperties />
                </Button>
              </ButtonGroup>

              <Input
                placeholder="digite o nome do comunicado"
                className="w-80 dark:text-amber-50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <DropdownMenu>
                <DropdownMenuTrigger render={<span />}>
                  <div className="ring-1 dark:ring-white/20 ring-emerald-400 text-emerald-800 dark:text-amber-50 hover:ring-2 transition-all duration-200 rounded-sm flex justify-center items-center bg-emerald-100/20 dark:bg-emerald-700 p-1 cursor-pointer">
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
                        Publicado
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={'rascunhos'}>
                        Não publicado
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <div>
                <PageButton
                  to="/comunicados/criar"
                  frase="Criar comunicado"
                  icon={<Plus />}
                />
              </div>
            </div>
          </div>

          {viewMode === 'cards' ? (
            <div className="w-full grid lg:grid-cols-4 sm:grid-cols-2 gap-3 h-full items-start">
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((item) => (
                  <AnnouncementCard
                    key={item.id}
                    announcement={item}
                    onUpdate={() => {}}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-400 italic py-10">
                  Nenhum comunicado encontrado.
                </p>
              )}
            </div>
          ) : (
            <div className="w-full my-2">
              <AnnouncementTable dados={filteredAndSortedData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
