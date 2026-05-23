const BASE = 'http://localhost:8000/api/v1';

function getToken() {
  return localStorage.getItem('access_token');
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? 'Error desconocido');
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  // Auth
  register: (data)          => request('POST', '/auth/register', data),
  login:    (data)          => request('POST', '/auth/login', data),
  logout:   (refresh_token) => request('POST', '/auth/logout', { refresh_token }),
  me:       ()              => request('GET',  '/auth/me'),

  // Books
  createBook:  (data)       => request('POST',   '/books/', data),
  listBooks:   (etiqueta)   => request('GET', `/books/${etiqueta ? `?etiqueta=${etiqueta}` : ''}`),
  getBook:     (id)         => request('GET',    `/books/${id}`),
  updateBook:  (id, data)   => request('PUT',    `/books/${id}`, data),
  deleteBook:  (id)         => request('DELETE', `/books/${id}`),

  // Opinions
  createOpinion:  (data)    => request('POST',   '/opinions/', data),
  listOpinions:   ()        => request('GET',    '/opinions/'),
  deleteOpinion:  (id)      => request('DELETE', `/opinions/${id}`),

  // Analytics
  getAnalytics: ()          => request('GET', '/analytics/'),
};

export function saveSession({ access_token, refresh_token }) {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('refresh_token', refresh_token);
}

export function clearSession() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

export function isLoggedIn() {
  return !!localStorage.getItem('access_token');
}
