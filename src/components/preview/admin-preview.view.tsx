import { memo, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '../ui/card';
import { MapPin } from 'lucide-react';

interface Types {
  message: string;
  template: string;
  selectedSector: string;
  uploadedImage: string | null;
}

const preview = memo(({ message, template, selectedSector, uploadedImage }: Types) => {
  const Dates = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);
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
          style={{ background: template }}
        >
          <div className="absolute inset-0 bg-black/20" />

          {uploadedImage ? (
            <div className="relative w-full h-full p-4">
              <img
                src={uploadedImage}
                alt="Upload Preview"
                className="w-full h-full object-contain rounded-md"
              />
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-lg p-6">
              <div className="bg-gray-900/95 rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-amber-50" />
                  <span className="font-semibold text-amber-50">
                    {selectedSector || 'Setor'}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-3 text-gray-100 text-center">
                  Comunicado Administrativo
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
          )}
        </div>
      </CardContent>
    </Card>
  );
});
export default preview;
