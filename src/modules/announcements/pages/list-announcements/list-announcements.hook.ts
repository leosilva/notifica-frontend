import { API_BASE_URL } from '@/constants/environments';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useListAnnouncements() {
  const [filter, setFilter] = useState('recente');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [data, setData] = useState([]);
  const token = localStorage.getItem('access_token');

  const handleAnnouncement = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/postagem`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }, [token]);

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
      result = result.filter((item) => !!item.publicado_em);
    } else if (filter === 'rascunhos') {
      result = result.filter((item) => !item.publicado_em);
    }

    if (filter === 'recente') {
      result.sort((a, b) => b.id - a.id);
    } else if (filter === 'antigo') {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [data, filter, searchTerm]);

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
