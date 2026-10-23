import { apiFetch } from './api';

export type Role = 'admin' | 'servidor' | 'aluno';

export interface CurrentUser {
  id: number;
  nome: string;
  matricula: string;
  email: string;
  role: Role;
}

/**
 * Busca o usuário autenticado em `GET /auth/me`.
 * Retorna `null` quando não há sessão válida ou a requisição falha.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const response = await apiFetch('/auth/me');

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as CurrentUser;
  } catch {
    return null;
  }
}

import { useCallback, useState } from 'react';

export function useRefresh() {
  const [isLoading, setIsLoading] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', tipo: '' });

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setAviso({ mensagem: '', tipo: '' });

    try {
      const response = await apiFetch('/auth/refresh', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Sessão expirada');
      }

      const data = await response.json();
      console.log('Token renovado automaticamente:', data);
      return data;
    } catch (error) {
      console.error(error);
      setAviso({ mensagem: 'Sessão expirada. Faça login novamente.', tipo: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { refresh, isLoading, aviso };
}
