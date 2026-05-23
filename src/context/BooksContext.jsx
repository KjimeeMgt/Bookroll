import { createContext, useContext, useState, useEffect } from "react";

const BooksContext = createContext();

export const ETIQUETAS = {
  QUIERO_LEER: "quiero-leer",
  LEYENDO: "leyendo",
  LEIDO: "leidos",
};

export function BooksProvider({ children }) {
  const [librosEtiquetados, setLibrosEtiquetados] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("librosEtiquetados")) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("librosEtiquetados", JSON.stringify(librosEtiquetados));
  }, [librosEtiquetados]);

  const etiquetar = (libro, etiqueta) => {
    setLibrosEtiquetados((prev) => {
      const actual = prev[libro.id];
      if (actual?.etiqueta === etiqueta) {
        const nuevo = { ...prev };
        delete nuevo[libro.id];
        return nuevo;
      }
      return { ...prev, [libro.id]: { ...libro, etiqueta } };
    });
  };

  const getEtiqueta  = (libroId) => librosEtiquetados[libroId]?.etiqueta || null;

  const getLibrosPor = (etiqueta) =>
    Object.values(librosEtiquetados).filter((l) => l.etiqueta === etiqueta);

  return (
    <BooksContext.Provider value={{ etiquetar, getEtiqueta, getLibrosPor }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}