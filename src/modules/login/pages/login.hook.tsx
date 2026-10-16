import { useCallback, useState } from 'react';
import { API_BASE_URL } from '@/constants/environments';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', tipo: '' });
  const Suap = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/suap/login`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      console.log('teste');
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { Suap, aviso };
}
