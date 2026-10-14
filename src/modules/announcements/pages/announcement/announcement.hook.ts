import { API_BASE_URL } from '@/constants/environments';
import { useCallback, useDeferredValue, useEffect, useState } from 'react';
import { useParams } from 'react-router';

interface Postagem {
  id: number;
  corpo: string;
  titulo: string;
  gradiente_fundo?: string;
  url?: string;
}
export function useAnnouncement() {
  const { identify } = useParams();
  const [data, setData] = useState<Postagem | null>(null);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [id, setId] = useState<number | null>(null);
  const [template, setTemplate] = useState(
    'linear-gradient(135deg, rgb(0, 180, 166), rgb(0, 139, 122))',
  );
  const [url, setUrl] = useState('');

  const token = localStorage.getItem('access_token');

  const handleAnnouncement = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/postagem/${identify}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result: Postagem = await response.json();

      setData(result);

      setMessage(result.corpo);
      setTitle(result.titulo);
      setId(result.id);
      setTemplate(result.gradiente_fundo);
      console.log(result.gradiente_fundo);
    } catch (error) {
      console.error(error);
    }
  }, [token, identify]);

  const [selectedSector, setSelectedSector] = useState('');
  const deferredMessage = useDeferredValue(message);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
