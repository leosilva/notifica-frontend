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
  fonte
}: AdmincardProps) {
  return (
    <div className="w-full h-auto rounded-3xl shadow-2xl p-12 lg:p-16 bg-gray-900/20 backdrop-blur-sm">
      <div className="flex items-center justify-center mb-8">
        <MapPin className="h-6 w-6 lg:h-8 lg:w-8 text-amber-50 mx-2" />
        <span className="font-semibold text-amber-50 text-4xl lg:text-3xl uppercase tracking-wide">
          {author === "" ? "NOTICIA" : "AVISO"}
        </span>
      </div>
      <h3 className="font-bold text-7xl lg:text-8xl xl:text-[3rem] leading-tight mb-10 text-gray-100 text-center p-2 break-words">
        {title === '' ? 'Comunicado Administrativo' : title}
      </h3>

      <p className="text-gray-300 mb-20 lg:mb-15 break-words text-center text-4xl lg:text-3xl leading-relaxed">
        {resume}
      </p>

      {/* Rodapé */}
<div className="text-gray-400 border-t border-gray-400 text-3xl pt-5 text-center">
  <div>{fonte ? `fonte: ${fonte}` : author ? `Administração: ${author}` : ''}</div>
  <div className="text-lg p-2">18/10/2026</div>
</div>
    </div>
  );
}
