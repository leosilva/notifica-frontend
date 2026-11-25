import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  fonte?: string | null;
  autor?: {
    atualizado_em: Date;
    role: any;
    nome?: string;
  } | null;
  tipo?: string;
  atualizado_em: Date;
  url?: string;
}

export function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgStyle, setBgStyle] = useState(
    'linear-gradient(to bottom right, #3b82f6, #1d4ed8)',
  );

  const autoplay = useRef(Autoplay({ delay: 10000 }));
  const BASE_URL = import.meta.env.VITE_FRONTEND_BASE_URL;

  const fetchNews = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/carrossel`);
      if (!response.ok) return;

      const data: News[] = await response.json();
      setNews(data);

      if (data.length > 0 && !api) {
        const first = data[0];
        if (first.imagem) {
          setBgStyle(`url(${first.imagem}) center/cover no-repeat`);
        } else if (first.gradiente) {
          setBgStyle(first.gradiente);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [BASE_URL, api]);

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 30000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  useEffect(() => {
    if (!api || news.length === 0) return;

    const handleSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
      const currentCard = news[index];

      if (currentCard) {
        if (currentCard.imagem) {
          setBgStyle(`url(${currentCard.imagem}) center/cover no-repeat`);
        } else if (currentCard.gradiente) {
          setBgStyle(currentCard.gradiente);
        }
      }

      if (index === news.length - 1) {
        fetchNews();
      }
    };

    handleSelect();
    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api, news, fetchNews]);

  const currentUrl = news[currentIndex]?.url;

  return (
    <div
      className="fixed inset-0 w-screen h-screen flex justify-center items-center transition-all duration-700 ease-in-out z-0 overflow-hidden"
      style={{ background: bgStyle || '#000000' }}
    >
      <div className="w-full max-w-[60vw] mx-auto relative z-10 flex justify-center items-center">
        {!!news.length && (
          <Carousel
            setApi={api}
            plugins={[autoplay.current]}
            opts={{ loop: true, watchDrag: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-0 flex items-center">
              {news.map((item, index) => (
                <CarouselItem
                  key={item.id || index}
                  className="pl-0 flex justify-center items-center w-full"
                >
                  {item.tipo === 'noticia' ? (
                    <AdminCard
                      title={item.titulo}
                      resume={item.corpo}
                      avatar={item.imagem ?? ''}
                      author={item.autor?.nome ?? ''}
                      fonte={item.fonte ?? ''}
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

      {currentUrl && (
        <div className="fixed bottom-8 right-8 z-20 ring-4 ring-black/20 rounded-md">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=3AA953&data=${encodeURIComponent(
              currentUrl,
            )}`}
            alt="QR Code para o link fornecido"
            className="w-36 h-36 rounded bg-white p-2 shadow-lg"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}