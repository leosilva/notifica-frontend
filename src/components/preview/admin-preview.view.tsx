import { memo, useMemo, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../ui/card';
import { Slider } from '../ui/slider';
import { MapPin } from 'lucide-react';

interface Types {
  message: string;
  template: string;
  selectedSector: string;
  uploadedImage: string | null;
  Slide: number;
  title: string;
}

const preview = memo(
  ({ message, template, selectedSector, uploadedImage, title }: Types) => {
    const Dates = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);
    const [slide, setSlide] = useState([100]);
    console.log(slide);
    return (
      <Card className="mt-8 transform-gpu bg-teal-50 dark:bg-emerald-950">
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
          <CardDescription>
            Veja como o comunicado administrativo ficará
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="relative h-80 rounded-lg overflow-hidden border flex items-center justify-center"
            style={{
              background: uploadedImage
                ? `url(${uploadedImage}) center/cover no-repeat`
                : template,
            }}
          >
            <div className="absolute inset-0 bg-black/20" />

            <div
              className="relative z-10 w-full max-w-lg m-6 rounded-xl"
              style={{
                backgroundColor: `rgba(17, 24, 39, ${slide[0] / 100})`,
              }}
            >
              <div className="rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-amber-50" />
                  <span className="font-semibold text-amber-50 opacity-100">
                    {selectedSector || 'Setor'}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-3 text-gray-100 text-center">
                  {title === '' ? 'Comunicado Administrativo' : title}
                </h3>

                <p className="text-gray-300 mb-4 wrap-break-word text-center">
                  {message || 'Sua mensagem aparecerá aqui...'}
                </p>

                <div className="text-sm text-gray-400 border-t pt-3 text-center">
                  <div>Administração: teste</div>
                  <div className="text-xs mt-1">{Dates}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start bg-teal-50 dark:bg-emerald-950 border-0">
          <CardTitle className="m-2 text-primary/60">Opacidade:</CardTitle>
          <Slider
            defaultValue={[100]}
            value={slide}
            onValueChange={(value) =>
              setSlide(Array.isArray(value) ? value : [value])
            }
            min={1}
            max={100}
            step={1}
            className="bg-amber-500"
          />
        </CardFooter>
      </Card>
    );
  },
);
export default preview;
