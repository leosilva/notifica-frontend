interface CarrosselcardProps {
    titulo: string;
    sumario: string;
    imagem: string | null;
}

export default function Carrosselcard({titulo, sumario}: CarrosselcardProps) {
    return (
        <div className="h-[70vh] w-[65vw] bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg rounded-2xl p-12 shadow-2xl border border-white/20 flex flex-col items-center gap-10 justify-center">
            <h1 className="flex items-center justify-center mb-4">l</h1>
            <h3 className="font-bold text-3xl md:text-4xl mb-6 text-gray-900 dark:text-gray-100">{titulo}</h3>
            <p className="text-gray-700 dark:text-gray-300 text-[1.8rem] leading-relaxed mb-10 break-words hyphens-auto overflow-wrap-anywhere max-w-sl mx-auto">{sumario}</p>
            <div className="flex items-center justify-center gap-2 text-[1.5rem] text-gray-500 dark:text-gray-400">
                <img src="" alt="" />
                <p>por:</p>
            </div>
        </div>
    )
}