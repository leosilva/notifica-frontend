import { useAnnouncement } from './announcement.hook';
import {AnnouncementMessage, AnnouncementPreview, PageButton, Header}  from '../../../components';
import { SendHorizonal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { json } from 'stream/consumers';

export function AnnouncementPage() {
  const {
    message,
    identify,
    setMessage,
    template,
    setTemplate,
    selectedSector,
    setSelectedSector,
    uploadedImage,
    setUploadedImage,
    title,
    setTitle,
    id,
    opacity,
    setOpacity,
    deferredMessage,
    handleAnnouncement,
    url,
    setUrl,
  } = useAnnouncement();
  
  
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/auth/me', {
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
        localStorage.setItem("user", JSON.stringify(dados))
      })
      .catch((erro) => {
        console.error('Erro:', erro);
      });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-600/20 dark:via-emerald-600/10 dark:to-teal-600/5 relative overflow-hidden ">
      <Header frase="Painel Administrativo" nome={data?.nome} foto={data?.foto}/>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-3">
            <AnnouncementMessage
              message={message}
              setMessage={setMessage}
              template={template}
              setTemplate={setTemplate}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
              title={title}
              setTitle={setTitle}
              id={id}
              opacity={opacity}
              setOpacity={setOpacity}
              url={url}
              setUrl={setUrl}
            />
          </div>
          <PageButton
            to="/comunicados"
            frase="Ver Seus Comunicados Salvos"
            icon={<SendHorizonal />}
          />

          <AnnouncementPreview
            message={deferredMessage}
            template={template}
            selectedSector={selectedSector}
            uploadedImage={uploadedImage}
            opacity={opacity}
            title={title}
            url={url}
          />
        </div>
      </div>
    </div>
  );
}
