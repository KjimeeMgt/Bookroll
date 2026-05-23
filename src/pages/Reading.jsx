import { useState } from "react";
import Sidebar from "../componentes/sidebar";
import SearchBar from "../componentes/searchbar";
import CategoryRow from "../componentes/categoryrow";
import SectionHeader from "../componentes/sectionhader";
import BookCard from "../componentes/bookcard";

const CATEGORIAS = [
  "Todos",
  "Nuevo",
  "Novela romántica",
  "Fantasía",
  "Suspenso",
  "Terror",
  "Biografía",
];

const LIBROS_POPULARES = [
  { id: 1, titulo: "El nombre del viento",   autor: "P. Rothfuss",      rating: 5, badge: "POPULAR" },
  { id: 2, titulo: "Cien años de soledad",   autor: "G. García Márquez",rating: 4, badge: null },
  { id: 3, titulo: "Pedro Páramo",           autor: "J. Rulfo",         rating: 4, badge: "NUEVO" },
  { id: 4, titulo: "La sombra del viento",   autor: "C. Ruiz Zafón",    rating: 4, badge: null },
  { id: 5, titulo: "Rayuela",                autor: "J. Cortázar",      rating: 3, badge: null },
  { id: 6, titulo: "Aura",                   autor: "C. Fuentes",       rating: 5, badge: null },
];

const RECOMENDADOS = [
  { id: 7,  titulo: "Ficciones",                 autor: "J. L. Borges",  rating: 5, badge: null },
  { id: 8,  titulo: "El túnel",                  autor: "E. Sábato",     rating: 4, badge: null },
  { id: 9,  titulo: "Como agua para chocolate",  autor: "L. Esquivel",   rating: 4, badge: "NUEVO" },
  { id: 10, titulo: "Los de abajo",              autor: "M. Azuela",     rating: 3, badge: null },
];

const VISIBLE = 6;

export default function Reading() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda]               = useState("");
  const [indice, setIndice]                   = useState(0);

  const librosFiltrados = LIBROS_POPULARES.filter((libro) => {
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

        {/* Popular esta semana */}
        <section>
          <SectionHeader
            title="Popular esta semana"
            onPrev={handlePrev}
            onNext={handleNext}
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {visibles.map((libro) => (
              <BookCard
                key={libro.id}
                titulo={libro.titulo}
                autor={libro.autor}
                rating={libro.rating}
                badge={libro.badge}
              />
            ))}
          </div>
        </section>

        {/* Recomendados para ti */}
        <section>
          <SectionHeader title="Recomendados para ti" showArrows={false} />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {RECOMENDADOS.map((libro) => (
              <BookCard
                key={libro.id}
                titulo={libro.titulo}
                autor={libro.autor}
                rating={libro.rating}
                badge={libro.badge}
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
