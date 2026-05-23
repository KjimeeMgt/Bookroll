// src/componentes/Infobook.jsx
import { Bookmark, Share2, Heart, BookOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Button from './Button';

export default function Infobook({
  isOpen,
  onClose,
  cover,
  titulo,
  autor,
  frase,
  descripcion,
  editorial,
  paginas,
  editores,
  rating = 0,
  onFavorite,
  onShare,
  onBookmark,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#2b1616] rounded-3xl overflow-hidden shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-[#1c0e0e]/50 text-[#f0e0c8] hover:bg-[#6B2737] transition-colors"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <article className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
          <div className="w-full md:w-1/3 bg-[#1c0e0e] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#7a4a4a]/30">
            {cover ? (
              <img
                src={cover}
                alt={titulo}
                className="w-full max-w-[240px] aspect-[2/3] object-cover rounded-xl shadow-2xl border-2 border-[#7a4a4a]/40"
              />
            ) : (
              <div className="w-60 aspect-[2/3] bg-gradient-to-br from-[#6B2737] to-[#3d2020] rounded-xl flex items-center justify-center">
                <BookOpen size={60} className="text-[#f0e0c8]/60" />
              </div>
            )}

            {rating > 0 && (
              <div className="mt-6 bg-[#2b1616] py-2 px-4 rounded-full">
                <Rating value={rating} readonly size="sm" />
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 p-8 flex flex-col bg-[#2b1616]">
            <header className="mb-6">
              <h2 className="font-serif text-[#f0e0c8] text-4xl font-medium leading-tight">
                {titulo || 'Título'}
              </h2>
              <p className="text-[#d4a574] text-lg uppercase tracking-wider mt-1">
                {autor || 'Autor'}
              </p>
              {frase && (
                <p className="text-[#f0e0c8]/70 text-sm italic mt-4 border-l-2 border-[#6B2737] pl-4">
                  "{frase}"
                </p>
              )}
            </header>

            <div className="flex gap-3 mb-8">
              <button
                onClick={onFavorite}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#3d2020] hover:bg-[#6B2737] text-[#f0e0c8] transition"
              >
                <Heart size={18} /> <span className="text-sm">Favorito</span>
              </button>

              <Link to="/formop" state={{ libro: { cover, titulo, autor } }}>
                <Button variant="ghost" size="md">Mi opinión</Button>
              </Link>

              <button
                onClick={onBookmark}
                className="w-14 h-12 flex items-center justify-center rounded-xl bg-[#1c0e0e] border border-[#7a4a4a]/30 text-[#f0e0c8] hover:bg-[#3d2020] transition"
                aria-label="Guardar"
              >
                <Bookmark size={20} />
              </button>

              <button
                onClick={onShare}
                className="w-14 h-12 flex items-center justify-center rounded-xl bg-[#1c0e0e] border border-[#7a4a4a]/30 text-[#f0e0c8] hover:bg-[#3d2020] transition"
                aria-label="Compartir"
              >
                <Share2 size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-[#d4a574] text-xs uppercase tracking-widest mb-3 font-bold">
                  Sinopsis
                </h3>
                <p className="text-[#f0e0c8]/80 text-sm leading-relaxed max-h-48 overflow-y-auto pr-2">
                  {descripcion || 'Sin descripción disponible.'}
                </p>
              </div>

              <div className="bg-[#1c0e0e]/50 p-4 rounded-2xl space-y-4 border border-[#7a4a4a]/10">
                <div>
                  <h3 className="text-[#d4a574] text-[10px] uppercase font-bold">Editorial</h3>
                  <p className="text-[#f0e0c8] text-sm">{editorial || '---'}</p>
                </div>
                <div>
                  <h3 className="text-[#d4a574] text-[10px] uppercase font-bold">Páginas</h3>
                  <p className="text-[#f0e0c8] text-sm">{paginas || '---'}</p>
                </div>
                {editores && (
                  <div>
                    <h3 className="text-[#d4a574] text-[10px] uppercase font-bold">Editores</h3>
                    <p className="text-[#f0e0c8] text-sm">{editores}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}