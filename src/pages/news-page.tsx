import { useCallback, useEffect, useState } from 'react';
import { CarouselItem } from '@/components/ui/carousel';
import { CarouselCard, GenericCarousel } from '../components';

interface News {
  id: number;
  titulo: string;
  sumario: string;
  avatar: string;
  author: string;
  background: string;
  qr_url: string;
}

export function NewsPage() {
  const [news, setNews] = useState<News[]>([]);

  const fetchNews = useCallback(async () => {
    try {
      // O nome da rota não corresponde com a realidade, mas o dado precisa fazer sentido para o seu uso
      const response = await fetch('http://localhost:8000/api/carrossel/');
      const data = await response.json();

      console.log(data);

      setNews(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="w-full h-full bg-linear-to-br from-blue-500 to-blue-700">
      <div className="w-full max-w-[65vw] mx-auto">
        {!!news.length && (
          <GenericCarousel>
            {news.map((item, index) => (
              <CarouselItem key={item.id || index}>
                <CarouselCard
                  title={item.titulo}
                  resume={item.sumario}
                  avatar={item.avatar}
                  author={item.author}
                />
              </CarouselItem>
            ))}
          </GenericCarousel>
        )}
      </div>
    </div>
  );
}
