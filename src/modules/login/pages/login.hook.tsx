import { useCallback, useState } from 'react';

export function useLogin() {
  const BASE_URL= import.meta.env.VITE_FRONTEND_BASE_URL
  const [isLoading, setIsLoading] = useState(false);
  const [aviso, setAviso] = useState({ mensagem: '', tipo: '' });
  const Suap = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/suap/login`, {
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
