import { MapPin } from 'lucide-react';

interface AdmincardProps {
  title: string;
  resume: string;
  avatar: string;
  author: string;
}

export default function Carouselcard({
  title,
  resume,
  avatar,
  author,
}: AdmincardProps) {
  return (
    <div className="w-full h-auto rounded-3xl shadow-2xl p-12 lg:p-16 bg-gray-900/20 backdrop-blur-sm">
      <div className="flex items-center justify-center gap-4 mb-8">
        <MapPin className="h-12 w-12 lg:h-16 lg:w-16 text-amber-50" />
        <span className="font-semibold text-amber-50 text-4xl lg:text-3xl uppercase tracking-wide">
          {'DIAC'}
        </span>
      </div>

      <h3 className="font-bold text-7xl lg:text-8xl xl:text-[3rem] leading-tight mb-10 text-gray-100 text-center p-2 break-words">
        {title === '' ? 'Comunicado Administrativo' : title}
      </h3>

      <p className="text-gray-300 mb-20 lg:mb-15 break-words text-center text-4xl lg:text-3xl leading-relaxed">
        {resume}
      </p>

      {/* Rodapé */}
      <div className="text-gray-400 border-t border-gray-600/50 text-3xl pt-5 text-center">
        <div>Administração: Roberto Carlos</div>
        <div className="text-lg p-2">16/06/2026</div>
      </div>
    </div>
  );
}
