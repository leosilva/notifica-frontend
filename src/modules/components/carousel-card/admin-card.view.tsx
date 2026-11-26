import { MapPin } from 'lucide-react';

interface AdmincardProps {
  title: string;
  resume: string;
  avatar: string;
  author: string;
  fonte: string;
}

export default function Carouselcard({
  title,
  resume,
  author,
  fonte,
}: AdmincardProps) {
  return (
    <div className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-16 bg-black-900/40 backdrop-blur-sm">
      <div className="flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-amber-50 mx-1.5 sm:mx-2" />
        <span className="font-semibold text-amber-50 text-lg sm:text-2xl lg:text-3xl uppercase tracking-wide">
          {author === '' ? 'NOTICIA' : 'AVISO'}
        </span>
      </div>

      <h3 className="font-bold text-3xl sm:text-5xl lg:text-8xl xl:text-[3rem] leading-tight mb-6 sm:mb-8 lg:mb-10 text-gray-100 text-center p-1 sm:p-2 break-words">
        {title === '' ? 'Comunicado Administrativo' : title}
      </h3>

      <p className="text-gray-500 mb-10 sm:mb-14 lg:mb-15 break-words text-center text-lg sm:text-2xl lg:text-3xl leading-relaxed">
        {resume}
      </p>

      {/* Rodapé */}
      <div className="text-gray-400 border-t border-gray-400 text-base sm:text-xl lg:text-3xl pt-4 sm:pt-5 text-center">
        <div>
          {fonte ? `fonte: ${fonte}` : author ? `Administração: ${author}` : ''}
        </div>
        <div className="text-xs sm:text-sm lg:text-lg p-1.5 sm:p-2">
          18/10/2026
        </div>
      </div>
    </div>
  );
}
