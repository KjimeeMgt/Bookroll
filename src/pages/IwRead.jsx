// src/pages/IwRead.jsx
import Sidebar from "../componentes/sidebar";
import BookCard from "../componentes/bookcard";
import { useBooks } from "../context/BooksContext";
import { Library } from "lucide-react";

export default function IwRead() {
  const { getLibrosPor } = useBooks();
  const libros = getLibrosPor("quiero-leer");

  return (
    <div className="flex h-screen bg-[#12060f] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#6B2737] flex items-center justify-center text-[#f0e0c8]">
            <Library size={20} />
          </div>
          <div>
            <h1 className="text-[#f0e0c8] font-serif text-2xl font-medium">Quiero leer</h1>
            <p className="text-[#a08070] text-sm">Los libros que tienes pendientes</p>
          </div>
          <span className="ml-auto text-[#a08070] text-sm">
            {libros.length} {libros.length === 1 ? "libro" : "libros"}
          </span>
        </div>

        {libros.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#1c0e0e] border border-[#3d2020] flex items-center justify-center">
              <Library size={32} className="text-[#3d2020]" />
            </div>
            <p className="text-[#a08070] text-sm max-w-xs">
              Aún no tienes libros aquí. Ve a{" "}
              <span className="text-[#f0e0c8]">Agregar libro</span> y etiquétalos como "Quiero leer".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-5">
            {libros.map((libro) => (
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
      </main>
    </div>
  );
}
