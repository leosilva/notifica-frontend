import { useCallback, useState } from 'react';

export function useLogin() {
  const BASE_URL = (import.meta.env.VITE_FRONTEND_BASE_URL || '').replace(/\/+$/, '');
  const [isLoading, setIsLoading] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', tipo: '' });

  const Suap = useCallback(async () => {
    setIsLoading(true);
    setAviso({ mensagem: '', tipo: '' });
    try {
      const response = await fetch(`${BASE_URL}/auth/suap/login`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao conectar com o servidor');
      }

      const data = await response.json();
      console.log(data);
      
      // Se a API retornar uma URL de redirecionamento do SUAP:
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error(error);
      setAviso({ mensagem: 'Erro ao tentar logar com o SUAP.', tipo: 'erro' });
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL]);

  return { Suap, aviso, isLoading };
}