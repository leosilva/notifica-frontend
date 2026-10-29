/**
 * Wrapper de `fetch` para a API do Notifica.
 *
 * A autenticação é feita por cookies httpOnly definidos pelo backend, então
 * toda requisição precisa enviar credenciais. Para métodos que alteram estado,
 * o `flask-jwt-extended` exige o token CSRF (double submit) no header
 * `X-CSRF-TOKEN`, lido do cookie `csrf_access_token`.
 *
 * Se a resposta for 401 (access token expirado), tenta renovar a sessão via
 * `POST /auth/refresh` (cookie de refresh) e repete a requisição original uma
 * única vez.
 */
export declare function apiFetch(
  path: string,
  options?: RequestInit,
): Promise<Response>;
