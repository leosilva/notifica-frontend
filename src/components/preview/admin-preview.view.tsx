import { memo, useMemo, useState } from 'react';
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
}

const preview = memo(({ message, template, selectedSector }: Types) => {
  const Dates = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);
  return (
    <Card className="mt-8 transform-gpu">
      <CardHeader>
        <CardTitle>Pré-visualização</CardTitle>
        <CardDescription>
          Veja como o comunicado administrativo ficará
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className="relative h-80 rounded-lg overflow-hidden border"
          style={{ background: template }}
        >
          <div className={'absolute inset-0 '} />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative h-full flex items-center justify-center p-6">
            <div className="text-center max-w-lg">
              <div className="bg-white/95 dark:bg-gray-900/95 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-semibold text-primary">
                    {selectedSector || 'Setor'}
                  </span>
                </div>

                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-100">
                  Comunicado Administrativo
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-4 wrap-break-word">
                  {message || 'Sua mensagem aparecerá aqui...'}
                </p>

                <div className="text-sm text-gray-500 dark:text-gray-400 border-t pt-3">
                  <div>Administração: teste</div>
                  <div className="text-xs mt-1">{Dates}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});
export default preview;
