import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';

interface StudentCardTypes {
  resume: string;
  avatar: string;
  author: string;
}

export default function Carouselcard({
  resume,
  avatar,
  author,
}: StudentCardTypes) {
  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
      <div className="bg-gray-900/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/10 flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-3xl">
        <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-full bg-white/10 text-white shadow-inner shrink-0">
          <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[42px] lg:h-[42px]" />
        </div>

        <div className="flex flex-col items-center justify-center text-center gap-4 w-full">
          <p className="text-gray-300 text-lg sm:text-2xl lg:text-3xl xl:text-5xl leading-relaxed max-w-2xl break-words">
            {resume}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4 sm:pt-6 border-t border-white/10 w-full text-gray-400 text-xs sm:text-sm lg:text-base shrink-0">
          <Avatar className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10">
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author?.[0] || 'P'}</AvatarFallback>
          </Avatar>
          <span>Por: {author || 'Admin'}</span>
        </div>
      </div>
    </div>
  );
}