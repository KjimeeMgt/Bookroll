import { useState } from "react";
import Sidebar from "../componentes/sidebar";
import SearchBar from "../componentes/searchbar";
import CategoryRow from "../componentes/categoryrow";
import SectionHeader from "../componentes/sectionhader";
import BookCard from "../componentes/bookcard";
import { useBooks } from "../context/BooksContext";

const CATEGORIAS = [
  "Todos",
  "Nuevo",
  "Novela romántica",
  "Fantasía",
  "Suspenso",
  "Terror",
  "Biografía",
];

const VISIBLE = 6;

export default function Leidos() {
  const { getLibrosPor } = useBooks();
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda]               = useState("");
  const [indice, setIndice]                   = useState(0);

  const libros = getLibrosPor('leidos');

  const librosFiltrados = libros.filter((libro) => {
    const matchBusqueda =
      libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      libro.autor.toLowerCase().includes(busqueda.toLowerCase());
    return matchBusqueda;
  });

  const visibles = librosFiltrados.slice(indice, indice + VISIBLE);

  const handlePrev = () =>
    setIndice((p) => Math.max(0, p - 1));

  const handleNext = () =>
    setIndice((p) =>
      p + VISIBLE >= librosFiltrados.length ? 0 : p + 1
    );

  return (
    <div className="flex h-screen bg-[#12060f] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-6">

        {/* Búsqueda */}
        <SearchBar
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onSubmit={(val) => setBusqueda(val)}
        />

        {/* Categorías */}
        <CategoryRow
          categories={CATEGORIAS}
          activeCategory={categoriaActiva}
          onCategoryClick={setCategoriaActiva}
        />

        {/* Leídos */}
        <section>
          <SectionHeader
            title="Leídos"
            onPrev={handlePrev}
            onNext={handleNext}
          />
          {librosFiltrados.length === 0 ? (
            <p className="text-[#a08070] text-sm mt-4">No hay libros en esta lista aún.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {visibles.map((libro) => (
                <BookCard
                  key={libro.id}
                  titulo={libro.titulo}
                  autor={libro.autor}
                  rating={libro.rating}
                  badge={libro.badge}
                  cover={libro.cover}
                />
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
