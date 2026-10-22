import { useDeferredValue, useEffect, useState } from 'react';
import { StudentMessageArea, StudentPreview } from '@/components';
import { Header } from '@/modules/components';

export function PostPage() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState(
    'linear-gradient(135deg, rgb(0, 180, 166), rgb(0, 139, 122))',
  );
  const deferredMessage = useDeferredValue(message);
  useEffect(() => {
    fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resposta) => {
        if (!resposta.ok) throw new Error('Erro na requisição');
        return resposta.json();
      })
      .then((dados) => {
        setData(dados);
      })
      .catch((erro) => {
        console.error('Erro:', erro);
      });
  }, []);
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-600/20 dark:via-emerald-600/10 dark:to-teal-600/5 relative overflow-hidden ">
      <Header frase="Portal do Estudante" nome={data?.nome} foto={data?.foto} />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <StudentMessageArea
            message={message}
            setMessage={setMessage}
            template={template}
            setTemplate={setTemplate}
          />
          <StudentPreview
            message={deferredMessage}
            template={template}
            nome={data?.nome}
            foto={data?.foto}
          />
        </div>
      </div>
    </div>
  );
}
