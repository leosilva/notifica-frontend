import { MapPin } from 'lucide-react';
import { memo, useEffect, useMemo, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Types {
  message: string;
  template: string;
  selectedSector: string;
  uploadedImage: File | null;
  opacity: number;
  title: string;
  url: string;
}

const Preview = memo(
  ({
    message,
    template,
    selectedSector,
    uploadedImage,
    title,
    opacity,
    url,
  }: Types) => {
    const Dates = useMemo(() => new Date().toLocaleDateString('pt-BR'), []);
    const [user, setUser] = useState(Object);

    const imageUrl = useMemo(() => {
      if (!uploadedImage) return null;
      return URL.createObjectURL(uploadedImage);
    }, [uploadedImage]);
    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    return (
      <Card className="mt-8 transform-gpu bg-teal-50 dark:bg-emerald-950">
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
          <CardDescription>
            Veja como o comunicado administrativo ficará
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex items-center justify-center p-6 h-[28rem] rounded-lg overflow-hidden border bg-gray-100 dark:bg-gray-900">
            <div
              className="absolute inset-0 transition-opacity duration-75 z-0 pointer-events-none"
              style={{
                background: imageUrl
                  ? `url(${imageUrl}) center/cover no-repeat`
                  : template,
                opacity: imageUrl ? opacity / 100 : 0.7,
              }}
            />

            <div
              className="absolute inset-0 bg-black/20 z-0 pointer-events-none"
              style={{ opacity: opacity / 100 }}
            />

            <div className="relative z-10 w-full max-w-lg rounded-xl shadow-xl p-6 bg-gray-900/20 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-2 mb-3">
                <MapPin className="h-5 w-5 text-amber-50" />
                <span className="font-semibold text-amber-50">
                  {selectedSector || 'Setor'}
                </span>
              </div>

              <h3 className="font-bold text-lg mb-3 text-gray-100 text-center">
                {title === '' ? 'Comunicado Administrativo' : title}
              </h3>

              <p className="text-gray-300 mb-4 break-words text-center">
                {message || 'Sua mensagem aparecerá aqui...'}
              </p>

              <div className="text-sm text-gray-400 border-t pt-3 text-center">
                <div>Administração: {user.nome}</div>
                <div className="text-xs mt-1">{Dates}</div>
              </div>
            </div>

            {url && (
              <div className="absolute bottom-6 right-10 z-20 ring-4 ring-black/20 rounded-sm rin">
                <img
                  src={`/api.qrserver.com/v1/create-qr-code/?size=150x150&color=3AA953&data=${encodeURIComponent(
                    url,
                  )}`}
                  alt="QR Code para o link fornecido"
                  className="w-30 h-30 rounded bg-white p-1.5 shadow-md"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  },
);

export default Preview;
