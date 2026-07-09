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
  Slide?: number;
  title: string;
}

const Preview = memo(
  ({ message, template, selectedSector, uploadedImage, title }: Types) => {
    const Dates = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);

    const [slide, setSlide] = useState([1]);
    const opacityValue = slide[0];

    return (
      <Card className="mt-8 transform-gpu bg-teal-50 dark:bg-emerald-950">
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
          <CardDescription>
            Veja como o comunicado administrativo ficará
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 grid-rows-1 h-80 rounded-lg overflow-hidden border bg-gray-100 dark:bg-gray-900">
            <div
              className="col-start-1 row-start-1 w-full h-full transition-opacity duration-75"
              style={{
                background: uploadedImage
                  ? `url(${uploadedImage}) center/cover no-repeat`
                  : template,
                opacity: opacityValue,
              }}
            />

            <div
              className="col-start-1 row-start-1 w-full h-full bg-black/20"
              style={{ opacity: opacityValue }}
            />

            <div className="col-start-1 row-start-1 flex items-center justify-center p-6">
              <div className="w-full max-w-lg rounded-xl shadow-xl p-6 bg-gray-900/20 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-amber-50" />
                  <span className="font-semibold text-amber-50">
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
          <CardTitle className="m-2 text-primary/60">
            Opacidade do Fundo:
          </CardTitle>
          <Slider
            value={slide}
            onValueChange={(value) =>
              setSlide(Array.isArray(value) ? value : [value])
            }
            min={0}
            max={1}
            step={0.01}
            className="bg-amber-500"
          />
        </CardFooter>
      </Card>
    );
  },
);

export default Preview;
