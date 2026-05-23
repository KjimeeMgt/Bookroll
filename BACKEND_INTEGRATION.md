# Backend Integration Guide — Bookroll

This document tells you exactly what to build to connect the Bookroll React frontend to its FastAPI + MongoDB backend. Read it top to bottom before touching any code.

---

## 0. Context

The frontend lives at `C:\Users\alber\My Stuff\Programming\Repositories\Bookroll`.  
The backend lives at `C:\Users\alber\My Stuff\Programming\Repositories\gestion-libros-backend`.

Run the backend with:
```
cd gestion-libros-backend
uvicorn app.main:app --reload
```
It listens on `http://localhost:8000`. CORS is already configured for `localhost:5173` and `localhost:3000`.

**Current state of the frontend:** everything uses `localStorage`. There is no HTTP layer at all — no axios, no fetch wrappers, no service files. You will be building that from scratch.

---

## 1. API Reference

### Auth — `/api/v1/auth`

| Method | Path | Auth required | Purpose |
|--------|------|--------------|---------|
| POST | `/api/v1/auth/register` | No | Create account |
| POST | `/api/v1/auth/login` | No | Get tokens |
| POST | `/api/v1/auth/logout` | No (body has refresh token) | Revoke session |
| GET | `/api/v1/auth/me` | Yes | Get current user |

**Register** `POST /api/v1/auth/register`
```json
// Request body
{ "username": "alice", "email": "alice@example.com", "password": "secret123" }

// 201 Response
{ "id": "...", "username": "alice", "email": "alice@example.com", "is_active": true, "created_at": "..." }
```

**Login** `POST /api/v1/auth/login`
```json
// Request body
{ "email": "alice@example.com", "password": "secret123" }

// 200 Response
{ "access_token": "<jwt>", "refresh_token": "<token>", "token_type": "bearer" }
```

**Logout** `POST /api/v1/auth/logout`
```json
// Request body
{ "refresh_token": "<token>" }
// 200 Response: { "message": "Logged out successfully" }
```

**Me** `GET /api/v1/auth/me` — requires `Authorization: Bearer <access_token>` header.
```json
// 200 Response
{ "id": "...", "username": "alice", "email": "alice@example.com", "is_active": true }
```

---

### Books — `/api/v1/books`

All book endpoints require `Authorization: Bearer <access_token>`.

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/v1/books/` | Add a book |
| GET | `/api/v1/books/` | List user's books (optional filter) |
| GET | `/api/v1/books/{id}` | Get one book |
| PUT | `/api/v1/books/{id}` | Update a book |
| DELETE | `/api/v1/books/{id}` | Delete a book |

**Book object shape** (used in both requests and responses):
```json
{
  "titulo":      "Cien años de soledad",
  "autor":       "Gabriel García Márquez",
  "cover":       "https://...",
  "frase":       "El mundo era tan reciente...",
  "descripcion": "Una saga familiar...",
  "editorial":   "Sudamericana",
  "paginas":     "432",
  "rating":      4.5,
  "badge":       "POPULAR",
  "etiqueta":    "leidos"
}
```

`etiqueta` must be one of: `"quiero-leer"` | `"leyendo"` | `"leidos"`.  
`rating` is a float 0–5 (or null).  
`paginas` is stored as a string (matches how the frontend's form sends it).

**Response** adds `id` (string) and `user_id` (string).

**List** `GET /api/v1/books/?etiqueta=leidos&skip=0&limit=100`  
Optional `etiqueta` query param filters by tag.  
Returns: `{ "items": [...], "total": 12 }`

---

### Opinions — `/api/v1/opinions`

All opinion endpoints require `Authorization: Bearer <access_token>`.

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/v1/opinions/` | Save a review |
| GET | `/api/v1/opinions/` | List user's reviews |
| GET | `/api/v1/opinions/{id}` | Get one review |
| PUT | `/api/v1/opinions/{id}` | Update a review |
| DELETE | `/api/v1/opinions/{id}` | Delete a review |

**Opinion object shape:**
```json
{
  "libro": {
    "cover":  "https://...",
    "titulo": "Cien años de soledad",
    "autor":  "Gabriel García Márquez"
  },
  "opinion": {
    "rating":      4,
    "resena":      "Un libro increíble...",
    "fraseFav":    "El mundo era tan reciente...",
    "fechaInicio": "2024-01-10",
    "fechaFin":    "2024-02-03",
    "cancion":     "Clandestino",
    "cantante":    "Manu Chao",
    "libroUnico":  "si",
    "protagonista": true
  }
}
```

**List** returns `{ "items": [...], "total": 5 }`. Each item also has `id` and `user_id`.

---

### Analytics — `/api/v1/analytics`

`GET /api/v1/analytics/` — requires auth.

```json
{
  "leidos":      12,
  "leyendo":     3,
  "quiero_leer": 5,
  "total":       20,
  "promedio_rating": 4.2,
  "paginas_totales": 3840,
  "rating_distribucion": [
    { "stars": 5, "count": 4 },
    { "stars": 4, "count": 5 },
    { "stars": 3, "count": 2 },
    { "stars": 2, "count": 1 },
    { "stars": 1, "count": 0 }
  ],
  "top_autores": [
    { "autor": "García Márquez", "count": 3 },
    { "autor": "Borges",         "count": 2 }
  ]
}
```

---

## 2. What You Need to Build

### Step 1 — API service layer

Create `src/api.js`. This is the single file that owns all HTTP logic.

```js
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
```

---

### Step 2 — Auth token storage

Tokens live in `localStorage`. Use these exact keys so everything is consistent:

| Key | Value |
|-----|-------|
| `access_token` | JWT string |
| `refresh_token` | Refresh token string |
| `user` | JSON-stringified user object from `/auth/me` |

Helper (add to `src/api.js` or a separate `src/auth.js`):
```js
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
```

---

### Step 3 — Wire up SignIn (`src/pages/login.jsx`)

The form already has `username` and `password` fields. The backend login takes `email` and `password`. **Change the field to `email`** (or map username → email if you prefer, but the backend validates an email format). On submit:

```js
import { api, saveSession } from '../api';
import { useNavigate } from 'react-router-dom';

// inside the component:
const navigate = useNavigate();

async function handleSubmit(e) {
  e.preventDefault();
  try {
    const tokens = await api.login({ email, password });
    saveSession(tokens);
    navigate('/home');
  } catch (err) {
    // show err.message to the user
  }
}
```

---

### Step 4 — Wire up SignUp (`src/pages/SignUp.jsx`)

The form already has username, email, password, confirmPassword. On submit (after client-side password match check):

```js
async function handleSubmit(e) {
  e.preventDefault();
  if (password !== confirmPassword) { /* show error */ return; }
  try {
    await api.register({ username, email, password });
    // auto-login after register
    const tokens = await api.login({ email, password });
    saveSession(tokens);
    navigate('/home');
  } catch (err) {
    // show err.message (e.g. "Email already registered")
  }
}
```

---

### Step 5 — Rewrite BooksContext (`src/context/BooksContext.jsx`)

This is the most important change. The context currently manages an in-memory + localStorage map. Replace it so it fetches from and writes to the API.

The context must expose the same interface the pages already use:
- `getLibrosPor(etiqueta)` → returns an array of book objects
- `etiquetar(libro, etiqueta)` → creates or updates a book with that etiqueta
- `getEtiqueta(libroId)` → returns the etiqueta string for a book id, or null

New implementation sketch:

```jsx
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api';

const BooksContext = createContext(null);

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);  // flat array from API

  const fetchAll = useCallback(async () => {
    if (!localStorage.getItem('access_token')) return;
    const data = await api.listBooks();   // no etiqueta filter → all books
    setBooks(data.items);
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Returns books filtered by etiqueta (same signature as before)
  function getLibrosPor(etiqueta) {
    return books.filter(b => b.etiqueta === etiqueta);
  }

  // Returns the etiqueta for a book by its id, or null
  function getEtiqueta(libroId) {
    return books.find(b => b.id === libroId)?.etiqueta ?? null;
  }

  // Creates a new book with a given etiqueta
  async function etiquetar(libro, etiqueta) {
    const payload = {
      titulo:      libro.titulo,
      autor:       libro.autor,
      cover:       libro.cover ?? null,
      frase:       libro.frase ?? null,
      descripcion: libro.descripcion ?? null,
      editorial:   libro.editorial ?? null,
      paginas:     libro.paginas ? String(libro.paginas) : null,
      rating:      libro.rating ?? null,
      badge:       libro.badge ?? null,
      etiqueta,
    };
    const created = await api.createBook(payload);
    setBooks(prev => [...prev, created]);
  }

  async function deleteBook(id) {
    await api.deleteBook(id);
    setBooks(prev => prev.filter(b => b.id !== id));
  }

  async function updateBook(id, data) {
    const updated = await api.updateBook(id, data);
    setBooks(prev => prev.map(b => b.id === id ? updated : b));
    return updated;
  }

  return (
    <BooksContext.Provider value={{ getLibrosPor, getEtiqueta, etiquetar, deleteBook, updateBook, books, fetchAll }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
```

**Important:** the book objects returned by the API use `id` (not `libro-{timestamp}`). Any page that uses a book's `id` to navigate or look up should continue to work because the context now stores the API's `id` field directly.

---

### Step 6 — Wire up AgregarLibro (`src/pages/AgregarLibro.jsx`)

Currently the page builds a book object with `id: 'libro-${Date.now()}'` and calls `etiquetar()`. After the context rewrite, `etiquetar()` calls the API and returns the server-generated id. The page doesn't need to generate an id anymore — just remove it from the object it passes to `etiquetar()`.

The page also does `navigate(...)` after tagging. That still works. No other changes needed here.

---

### Step 7 — Wire up Formo (`src/pages/Formo.jsx`)

Currently saves to `localStorage.setItem('opiniones', ...)`. Replace with:

```js
import { api } from '../api';

// in handleSubmit (after building the opinion object):
await api.createOpinion({
  libro: {
    cover:  libro.cover,
    titulo: libro.titulo,
    autor:  libro.autor,
  },
  opinion: {
    rating,
    resena,
    fraseFav,
    fechaInicio,
    fechaFin,
    cancion,
    cantante,
    libroUnico,
    protagonista,
  },
});
navigate('/misopiniones');
```

---

### Step 8 — Wire up MisOpiniones (`src/pages/misopiniones.jsx`)

Currently reads from `localStorage.getItem('opiniones')`. Replace:

```js
const [opiniones, setOpiniones] = useState([]);

useEffect(() => {
  api.listOpinions().then(data => setOpiniones(data.items));
}, []);

async function handleDelete(id) {
  await api.deleteOpinion(id);
  setOpiniones(prev => prev.filter(o => o.id !== id));
}
```

The opinion objects from the API have the same `libro` and `opinion` nested shape the page already renders.

---

### Step 9 — Wire up Analytics (`src/pages/Analytics.jsx`)

Currently computes everything from `getLibrosPor()`. Replace the whole computation block with a single API call:

```js
const [stats, setStats] = useState(null);

useEffect(() => {
  api.getAnalytics().then(setStats);
}, []);

if (!stats) return <p>Cargando...</p>;
```

Then replace all derived variables with the stats object:
| Was | Now |
|-----|-----|
| `leidos.length` | `stats.leidos` |
| `leyendo.length` | `stats.leyendo` |
| `quieroLeer.length` | `stats.quiero_leer` |
| `todos.length` | `stats.total` |
| `promedioRating` | `stats.promedio_rating ?? '—'` |
| `paginasTotales` | `stats.paginas_totales` |
| `ratingDist` | `stats.rating_distribucion` (already `[{stars, count}]`) |
| `topAutores` | `stats.top_autores.map(a => [a.autor, a.count])` |
| `maxRating` | `Math.max(...stats.rating_distribucion.map(r => r.count), 1)` |
| `maxAutor` | `stats.top_autores[0]?.count \|\| 1` |

---

### Step 10 — Wire up Reading and Leidos pages

Both pages (`src/pages/Reading.jsx` and `src/pages/leidos.jsx`) currently render hardcoded static data and are **not connected to BooksContext at all**. They need to use real data:

```js
import { useBooks } from '../context/BooksContext';

// in Reading.jsx:
const { getLibrosPor } = useBooks();
const libros = getLibrosPor('leyendo');

// in leidos.jsx:
const libros = getLibrosPor('leidos');
```

Replace the hardcoded `LIBROS` array and the static pagination logic with the real `libros` array from context. The search filter (`libros.filter(...)`) will continue to work unchanged.

---

### Step 11 — Protected routes

The backend returns 401 for any protected route if no token is present or the token has expired. Add a guard so unauthenticated users are redirected to `/signin`:

```jsx
// src/components/RequireAuth.jsx
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../api';

export default function RequireAuth({ children }) {
  return isLoggedIn() ? children : <Navigate to="/signin" replace />;
}
```

Wrap all non-public routes in `App.jsx`:
```jsx
<Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
// ... repeat for /quiero-leer, /leyendo, /leidos, /agregar, /formop, /misopiniones, /calendario, /analytics
```

Public routes (no wrapper needed): `/`, `/signin`, `/signup`.

---

## 3. File Summary

| File | Action |
|------|--------|
| `src/api.js` | **Create** — all HTTP calls |
| `src/context/BooksContext.jsx` | **Rewrite** — fetch from API instead of localStorage |
| `src/pages/login.jsx` | **Update** — call `api.login`, save tokens, redirect |
| `src/pages/SignUp.jsx` | **Update** — call `api.register` then `api.login` |
| `src/pages/AgregarLibro.jsx` | **Minor** — remove manual id generation |
| `src/pages/Formo.jsx` | **Update** — call `api.createOpinion` instead of localStorage |
| `src/pages/misopiniones.jsx` | **Update** — call `api.listOpinions` / `api.deleteOpinion` |
| `src/pages/Analytics.jsx` | **Update** — call `api.getAnalytics`, replace computed vars |
| `src/pages/Reading.jsx` | **Update** — use `getLibrosPor('leyendo')` from context |
| `src/pages/leidos.jsx` | **Update** — use `getLibrosPor('leidos')` from context |
| `src/componentes/RequireAuth.jsx` | **Create** — route guard |
| `src/App.jsx` | **Update** — wrap protected routes with `<RequireAuth>` |

---

## 4. Notes

- The backend field for books uses `titulo` / `autor` (Spanish), matching the frontend exactly. Do not rename.
- `paginas` is always sent and stored as a **string** (e.g. `"432"`), not a number.
- The Calendario page (`src/pages/Calendario.jsx`) already uses `getLibrosPor()` from context and assigns dates algorithmically — it will work automatically once the context is rewritten (Step 5). No changes needed there.
- Home (`src/pages/Home.jsx`) shows static popular/recommended books hardcoded in the component. Leave it as-is unless you want to add a discovery feature.
- Error handling: show `err.message` from caught API errors — the backend always returns `{ "detail": "..." }` which `api.js` surfaces as the error message.