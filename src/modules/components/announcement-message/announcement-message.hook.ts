import { apiFetch } from '@/lib/api';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export interface TypesHook {
  setMessage: (value: string) => void;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setTitle: (value: string) => void;
  id: number | null;
  uploadedImage: File | null;
}

export function useAnnouncementMessage({
  setMessage,
  setTitle,
  setUploadedImage,
  uploadedImage,
  id,
}: TypesHook) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 150) {
      setMessage(value);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setTitle(value);
    }
  };

  const fetchPublished = async (data: FormData) => {
    try {
      await apiFetch('/noticias', {
        method: 'POST',
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSaved = async (data: FormData) => {
    try {
      await apiFetch('/noticias', {
        method: 'POST',
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateSaved = async (postId: number, data: FormData) => {
    try {
      await apiFetch(`/noticias/${postId}`, {
        method: 'PUT',
        body: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const action = (e.nativeEvent as SubmitEvent).submitter?.getAttribute(
      'value',
    );

    const apiFormData = new FormData();
    const formTitle = form.get('titulo') as string;
    const formCorpo = form.get('corpo') as string;

    if (formCorpo === '') {
      toast.error('digite algo antes de publicar');
      return;
    }

    setIsSubmitting(true);

    try {
      apiFormData.append(
        'titulo',
        formTitle === '' ? 'Comunicado Administrativo' : formTitle,
      );
      apiFormData.append('corpo', formCorpo);
      apiFormData.append(
        'visibilidade',
        action === 'publish' ? 'publicada' : 'rascunho',
      );

      if (uploadedImage) {
        apiFormData.append('imagem', uploadedImage);
      }

      if (action === 'publish') {
        if (id !== null) {
          await updateSaved(id, apiFormData);
          await fetchPublished(apiFormData);
          toast.success('mensagem atualizada e publicada com sucesso');
        } else {
          await fetchPublished(apiFormData);
          toast.success('mensagem publicada com sucesso');
        }
      } else {
        if (id !== null) {
          await updateSaved(id, apiFormData);
          toast.success('mensagem atualizada com sucesso');
        } else {
          await fetchSaved(apiFormData);
          toast.success('mensagem salva com sucesso');
        }
      }
      window.location.href = "/comunicados"

      for (const [key, value] of apiFormData.entries()) {
        console.log(key, value);
      }

      setMessage('');
      setTitle('');
      removeImage();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    removeImage,
    handleSubmit,
    handleTitleChange,
    handleMessageChange,
    isSubmitting,
  } as const;
}