import { CarrosselData } from '../components'
import { useEffect, useState } from 'react'

interface MyInfoProps {
    id: number;
    titulo: string;
    sumario: string;
    imagem: string | null;
}


export function Carrossellayout() {
    const [dados, setDados] = useState<MyInfoProps[]>([]);
    const [qrImage, setqrImage] = useState('');

    useEffect(() => {
        async function handleData() {
            try {
                const response = await fetch("http://localhost:8000/api/carrossel/");
                const data = await response.json();

                console.log(data);
                setqrImage(data.link)
                setDados(data);

            } catch (error) {
                console.log(error);
            }
        }

        handleData();
    }, []);

    const qrCodeUrl = `http(s)://api.qrserver.com/v1/create-qr-code/?data=${qrImage}&size=[pixels]x[pixels]`;

    return (
        <div className='w-full h-full relative'>
            <div className='p-10 bg-gray-300 absolute top-[90%] left-[90%] z-50'>
                <img src={qrCodeUrl} alt="QR Code" />
            </div>
            {dados.length > 0 && <CarrosselData info={dados} />}
        </div>
    )
}
