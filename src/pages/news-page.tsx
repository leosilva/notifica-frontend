import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { StudentCard, AdminCard } from '../modules/components/carousel-card';

interface News {
  id: number;
  titulo: string;
  corpo: string;
  gradiente?: string | null;
  imagem?: string | null;
  autor?: {
    atualizado_em: Date;
    role: any;
    nome?: string;
  } | null;
  tipo?: string;
  atualizado_em: Date;
}

export function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [bgStyle, setBgStyle] = useState(
    'linear-gradient(to bottom right, #3b82f6, #1d4ed8)',
  );

  const autoplay = Autoplay({ delay: 10000 });
  const BASE_URL = import.meta.env.VITE_FRONTEND_BASE_URL;

  // Mock temporário com os dados do print e imagem do campus IFRN Ceará-Mirim
  const fetchNews = useCallback(async () => {
    const mockData: News[] = [
      {
        id: 1,
        titulo: 'Redução dos horários de aula no turno matutino',
        corpo: 'Prezados(as) alunos(as), informamos que nessa quarta-feira (17/06/2026), devido a reunião com os responsáveis, o horário das aulas acabarão às 10:20.',
        // URL de exemplo de uma imagem oficial/representativa do campus IFRN Ceará-Mirim (pode ajustar para a URL exata desejada)
        imagem: 'https://portal.ifrn.edu.br/campus/cearamirim/a-instituicao/imagens/campus-ceara-mirim/@@images/image',
        gradiente: null,
        tipo: 'comunicado',
        autor: {
          role: 'servidor',
          nome: 'Roberto Carlos',
          atualizado_em: new Date('2026-06-16'),
        },
        atualizado_em: new Date('2026-06-16'),
      },
    ];

    setNews(mockData);

    if (mockData.length > 0) {
      const first = mockData[0];
      if (first.imagem) {
        setBgStyle(`url(${first.imagem}) center/cover no-repeat`);
      } else if (first.gradiente) {
        setBgStyle(first.gradiente);
      }
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    if (!api || news.length === 0) return;

    const handleSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      const currentCard = news[currentIndex];

      if (currentCard) {
        if (currentCard.imagem) {
          setBgStyle(`url(${currentCard.imagem}) center/cover no-repeat`);
        } else if (currentCard.gradiente) {
          setBgStyle(currentCard.gradiente);
        }
      }

      if (currentIndex === news.length - 1) {
        fetchNews();
      }
    };

    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api, news, fetchNews]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex justify-center items-center transition-all duration-700 ease-in-out z-0 overflow-hidden"
      style={{ background: bgStyle || '#000000' }}
    >
      <div className="w-full max-w-[60vw] mx-auto relative z-10">
        {!!news.length && (
          <Carousel
            setApi={setApi}
            plugins={[autoplay]}
            opts={{ loop: true, watchDrag: false }}
          >
            <CarouselContent>
              {news.map((item, index) => (
                <CarouselItem key={item.id || index}>
                  {item.autor?.role === 'servidor' ? (
                    <AdminCard
                      title={item.titulo}
                      resume={item.corpo}
                      avatar={item.imagem ?? ''}
                      author={item.autor?.nome ?? ''}
                    />
                  ) : (
                    <StudentCard
                      author={item.autor?.nome}
                      avatar=""
                      resume={item.corpo}
                    />
                  )}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}