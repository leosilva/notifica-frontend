import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { MessageSquare } from 'lucide-react';

interface CarrosselcardProps {
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
}: CarrosselcardProps) {
  return (
    <div className="flex items-center justify-center p-8 w-full">
      <div className="bg-gray-900/40 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/10 flex flex-col items-center justify-center gap-8 w-full max-w-3xl">
        {/* Ícone ainda maior e proporcional */}
        <div className="flex items-center justify-center w-22 h-22 rounded-full bg-white/10 text-white shadow-inner shrink-0">
          <MessageSquare size={42} />
        </div>

        {/* Título e Texto principal ainda maiores */}
        <div className="flex flex-col items-center justify-center text-center gap-4 w-full">
          <p className="text-gray-300 text-5xl md:text-3xl leading-relaxed max-w-2xl break-words">
            {resume}
          </p>
        </div>

        {/* Rodapé proporcional maior com Avatar e Autor */}
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-white/10 w-full text-gray-400 text-base shrink-0">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author?.[0] || 'P'}</AvatarFallback>
          </Avatar>
          <span>Por: {author || 'Admin'}</span>
        </div>
      </div>
    </div>
  );
}