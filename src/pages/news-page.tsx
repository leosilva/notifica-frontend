import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { AdminCard } from '../components';
import { API_BASE_URL } from '@/constants/environments';
import {default as StudentCard} from '@/components/carousel-card/student-card.view'

interface News {
  id: number;
  titulo: string;
  corpo: string;
  gradiente?: string | null;
  imagem?: string | null;
  autor?: {
    role: any; nome?: string 
} | null;
  tipo?: string;
}

export function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [bgColor, setBgColor] = useState(
    'linear-gradient(to bottom right, #3b82f6, #1d4ed8)',
  );

  const autoplay = Autoplay({ delay: 10000 });

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/carrossel/?setor=DIAC`);
      const data = await response.json();
      setNews(data);
      console.log(data);

      if (data.length > 0 && data[0].gradiente) {
        setBgColor(data[0].gradiente);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  useEffect(() => {
    if (!api || news.length === 0) return;

    api.on('select', () => {
      const currentIndex = api.selectedScrollSnap();
      const currentCard = news[currentIndex];

      if (currentCard?.gradiente) {
        setBgColor(currentCard.gradiente);
      }
    });
  }, [api, news]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex justify-center items-center transition-all duration-700 ease-in-out z-0 overflow-hidden"
      style={{ background: bgColor }}
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
                  {item.autor.role === 'servidor' ?
                  <AdminCard
                    title={item.titulo}
                    resume={item.corpo}
                    avatar={item.imagem ?? ''}
                    author={item.autor?.nome ?? ''}
                  /> :
                  <StudentCard author={item.autor.nome} avatar='' resume={item.corpo} ></StudentCard>}
                </CarouselItem> 
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}
