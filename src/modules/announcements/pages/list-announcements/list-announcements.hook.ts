import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { getCurrentUser } from '@/lib/auth';

interface Postagem {
  id: number;
  titulo?: string;
  visibilidade?: string;
  autor: {
    nome: string;
  };
  [key: string]: unknown;
}

export function useListAnnouncements() {
  const [filter, setFilter] = useState('recente');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [data, setData] = useState<Postagem[]>([]);
const handleAnnouncement = useCallback(async () => {
  try {
    const response = await apiFetch('/noticias');

    if (!response.ok) {
      throw new Error(
        `Não foi possível carregar os comunicados (${response.status}).`,
      );
    }

    const result = await response.json();

    setData(Array.isArray(result) ? result : []);
  } catch (error) {
    console.error(error);
  }
}, []);

  useEffect(() => {
    handleAnnouncement();
  }, [handleAnnouncement]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchTerm.trim() !== '') {
      result = result.filter((item) =>
        item.titulo?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filter === 'publicados') {
      result = result.filter((item) => item.visibilidade === 'publicada');
    } else if (filter === 'rascunhos') {
      result = result.filter((item) => item.visibilidade !== 'publicada');
    }

    if (filter === 'recente') {
      result.sort((a, b) => b.id - a.id);
    } else if (filter === 'antigo') {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [data, filter, searchTerm]);
  console.log(filteredAndSortedData);
  return {
    filteredAndSortedData,
    viewMode,
    setViewMode,
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
  };
}
