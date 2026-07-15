import { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { AdminCard } from '../components';
import Autoplay from 'embla-carousel-autoplay';

interface News {
  id: number;
  titulo: string;
  corpo: string;
  avatar: string;
  author: string;
  gradiente_fundo: string;
  qr_url: string;
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
      const response = await fetch('http://localhost:8000/api/carrossel/');
      const data = await response.json();
      const activeNews = data.filter((item) => item.disponivel);
      setNews(activeNews);
      console.log(data);

      if (activeNews.length > 0 && activeNews[0].gradiente_fundo) {
        setBgColor(activeNews[0].gradiente_fundo);
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

      if (currentCard?.gradiente_fundo) {
        setBgColor(currentCard.gradiente_fundo);
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
                  <AdminCard
                    title={item.titulo}
                    resume={item.corpo}
                    avatar={item.avatar}
                    author={item.author}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </div>
  );
}
