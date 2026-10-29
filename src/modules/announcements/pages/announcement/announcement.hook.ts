import { useCallback, useDeferredValue, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { apiFetch } from '@/lib/api';

interface Postagem {
  id: number;
  corpo: string;
  titulo: string;
  gradiente?: string;
  url?: string;
}
const DEFAULT_TEMPLATE =
  'linear-gradient(135deg, rgb(0, 180, 166), rgb(0, 139, 122))';

export function useAnnouncement() {
  const { identify } = useParams();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState<number | null>(null);
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [url, setUrl] = useState('');

  const handleAnnouncement = useCallback(async () => {
    try {
      const response = await apiFetch(`/noticias/${identify}`);

      if (!response.ok) {
        throw new Error(
          `Não foi possível carregar o comunicado (${response.status}).`,
        );
      }

      const result: Postagem = await response.json();

      setMessage(result.corpo ?? '');
      setTitle(result.titulo ?? '');
      setId(result.id ?? null);
      setTemplate(result.gradiente || DEFAULT_TEMPLATE);
    } catch (error) {
      console.error(error);
    }
  }, [identify]);

  const [selectedSector, setSelectedSector] = useState('');
  const deferredMessage = useDeferredValue(message);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [opacity, setOpacity] = useState<number>(100);

  useEffect(() => {
    if (identify) {
      handleAnnouncement();
    }
  }, [identify, handleAnnouncement]);

  return {
    message,
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
    identify,
    url,
    setUrl,
  };
}
