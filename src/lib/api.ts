import { API_BASE_URL } from '@/constants/environments';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

const CSRF_HEADER_NAME = 'X-CSRF-TOKEN';
const ACCESS_CSRF_COOKIE_NAME = 'csrf_access_token';
const REFRESH_CSRF_COOKIE_NAME = 'csrf_refresh_token';

const REFRESH_PATH = '/auth/refresh';
const LOGOUT_PATH = '/auth/logout';

/**
 * Promise compartilhada para evitar disparar vários refresh em paralelo
 * quando várias requisições recebem 401 ao mesmo tempo.
 */
let refreshPromise: Promise<boolean> | null = null;

function getCookie(name: string): string | null {
  const cookies = document.cookie ? document.cookie.split('; ') : [];

  for (const cookie of cookies) {
    const [key, ...value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value.join('='));
    }
  }

  return null;
}

function resolveUrl(path: string): string {
  return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
}

function buildHeaders(options: RequestInit, csrfCookieName: string): Headers {
  const headers = new Headers(options.headers);
  const method = (options.method ?? 'GET').toUpperCase();

  if (!SAFE_METHODS.has(method)) {
    const csrfToken = getCookie(csrfCookieName);
    if (csrfToken) {
      headers.set(CSRF_HEADER_NAME, csrfToken);
    }
  }

  // Não definir Content-Type em FormData: o browser precisa gerar o boundary.
  const isFormData =
    typeof FormData !== 'undefined' && options.body instanceof FormData;

  if (options.body && !isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
}

function send(
  path: string,
  options: RequestInit,
  csrfCookieName: string,
): Promise<Response> {
  return fetch(resolveUrl(path), {
    ...options,
    headers: buildHeaders(options, csrfCookieName),
    credentials: 'include',
  });
}

async function refreshAccessToken(): Promise<boolean> {
  try {
    const response = await send(
      REFRESH_PATH,
      { method: 'POST' },
      REFRESH_CSRF_COOKIE_NAME,
    );
    return response.ok;
  } catch {
    return false;
  }
}

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
export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const response = await send(path, options, ACCESS_CSRF_COOKIE_NAME);

  const canRefresh = path !== REFRESH_PATH && path !== LOGOUT_PATH;

  if (response.status !== 401 || !canRefresh) {
    return response;
  }

  refreshPromise ??= refreshAccessToken().finally(() => {
    refreshPromise = null;
  });

  const refreshed = await refreshPromise;

  if (!refreshed) {
    return response;
  }

  return send(path, options, ACCESS_CSRF_COOKIE_NAME);
}
