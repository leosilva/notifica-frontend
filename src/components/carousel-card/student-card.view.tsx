import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

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
    <div className="h-[70vh] bg-gray-900/95 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/20 flex flex-col items-center gap-10 justify-center">
      <h1 className="flex items-center justify-center mb-4 text-gray-100">l</h1>
      <h3 className="font-bold text-3xl md:text-4xl mb-6 text-gray-100">
        {title}
      </h3>
      <p className="text-gray-300 text-[1.8rem] leading-relaxed mb-10 wrap-break-word hyphens-auto overflow-wrap-anywhere max-w-sl mx-auto">
        {resume}
      </p>
      <div className="flex items-center justify-center gap-2 text-[1.5rem] text-gray-400">
        <Avatar>
          <AvatarImage src={avatar} alt="" />
          <AvatarFallback>Person</AvatarFallback>
        </Avatar>
        <p>por: {author}</p>
      </div>
    </div>
  );
}
