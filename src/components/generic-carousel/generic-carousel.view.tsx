import type { ReactNode } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent } from '../ui/carousel';

interface GenericProp {
  children: React.ReactNode;
  onSlideChange?: (index: number) => void;
}

export default function GenericCarouselView({ children }: GenericProp) {
  return (
    <Carousel
      className="w-full h-full"
      opts={{ loop: true, watchDrag: false }}
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
    >
      <CarouselContent className="">{children}</CarouselContent>
    </Carousel>
  );
}
