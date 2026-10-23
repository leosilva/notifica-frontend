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

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function useRefresh() {
  const [isLoading, setIsLoading] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', tipo: '' });

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setAviso({ mensagem: '', tipo: '' });

    try {
      const csrfToken = getCookie('csrf_refresh_token');

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken }),
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Sessão expirada');
      }

      const data = await response.json();
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