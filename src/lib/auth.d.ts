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
export declare function getCurrentUser(): Promise<CurrentUser | null>;
