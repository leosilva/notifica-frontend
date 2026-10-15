import { useCallback, useState } from 'react';
import { API_BASE_URL } from '@/constants/environments';

export function useLogin() {
  const dados = {
    identificacao: '20251174010015',
    nome_social: '',
    nome_usual: 'Matheus Rodrigues',
    nome_registro: 'Matheus Lemos Rodrigues',
    nome: 'Matheus Rodrigues',
    primeiro_nome: 'Matheus',
    ultimo_nome: 'Rodrigues',
    email: '',
    email_secundario: 'lemosrodriguesmatheus@gmail.com',
    email_google_classroom: 'lemos.matheus@escolar.ifrn.edu.br',
    email_academico: 'matheus.lemos@academico.ifrn.edu.br',
    campus: 'CM',
    foto: 'https://suap.ifrn.edu.br/djtools/arquivo/edu/aluno/68850f85-afbf-4fd3-b2af-5bb059bae27f/foto/75x100/',
    tipo_usuario: 'Aluno',
    email_preferencial: 'lemosrodriguesmatheus@gmail.com',
    cpf: '712.799.554-06',
    data_de_nascimento: '2009-11-18',
    sexo: 'M',
    passaporte: '',
  };
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
