import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../api';

const BooksContext = createContext(null);

export const ETIQUETAS = {
  QUIERO_LEER: 'quiero-leer',
  LEYENDO: 'leyendo',
  LEIDO: 'leidos',
};

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchAll = useCallback(async () => {
    if (!localStorage.getItem('access_token')) return;
    try {
      const data = await api.listBooks();
      setBooks(data.items);
    } catch {
      // token expired or network error — leave books empty
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  function getLibrosPor(etiqueta) {
    return books.filter(b => b.etiqueta === etiqueta);
  }

  function getEtiqueta(libroId) {
    return books.find(b => b.id === libroId)?.etiqueta ?? null;
  }

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
