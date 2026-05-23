// src/componentes/OpinionCard.jsx
import { Calendar, Music, Quote, BookOpen, Heart, Pencil, Trash2 } from 'lucide-react';
import Rating from './Rating';

export default function OpinionCard({
  cover,
  titulo,
  autor,
  opinion,   // objeto con todos los datos del formulario
  onEdit,
  onDelete,
}) {
  if (!opinion) {
    return (
      <div className="bg-[#3d2020]/40 rounded-2xl p-8 text-center text-[#a08070]">
        No has escrito una opinión para este libro todavía.
      </div>
    );
  }

  const {
    rating,
    resena,
    fraseFav,
    fechaInicio,
    fechaFin,
    cancion,
    cantante,
    libroUnico,
    protagonista,
  } = opinion;

  // Helper para formatear fechas a "DD MMM"
  const formatDate = (str) => {
    if (!str) return '—';
    const d = new Date(str);
    return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
  };

  return (
    <article className="w-full max-w-3xl bg-[#3d2020]/40 border border-[#7a4a4a]/30 rounded-3xl overflow-hidden shadow-2xl">

      {/* Header con portada + título */}
      <header className="flex gap-5 p-6 bg-[#1c0e0e]/60 border-b border-[#7a4a4a]/20">
        {cover ? (
          <img
            src={cover}
            alt={titulo}
            className="w-24 aspect-[2/3] object-cover rounded-lg shadow-lg flex-shrink-0"
          />
        ) : (
          <div className="w-24 aspect-[2/3] bg-gradient-to-br from-[#6B2737] to-[#3d2020] rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen size={28} className="text-[#f0e0c8]/60" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h2 className="font-serif text-[#f0e0c8] text-2xl font-medium leading-tight">
            {titulo || 'Sin título'}
          </h2>
          <p className="text-[#d4a574] text-sm uppercase tracking-wider mt-1">
            {autor || 'Autor desconocido'}
          </p>
          {rating > 0 && (
            <div className="mt-3">
              <Rating value={rating} readonly size="sm" />
            </div>
          )}

          {/* Acciones */}
          {(onEdit || onDelete) && (
            <div className="flex gap-2 mt-3">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="flex items-center gap-1.5 text-xs text-[#d4a574] hover:text-[#f0e0c8] transition"
                >
                  <Pencil size={14} /> Editar
                </button>
              )}
              {onDelete && (
                <button
                  onClick={onDelete}
                  className="flex items-center gap-1.5 text-xs text-[#a08070] hover:text-red-400 transition ml-3"
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Cuerpo */}
      <div className="p-6 space-y-6">

        {/* Fechas de lectura */}
        {(fechaInicio || fechaFin) && (
          <div className="flex items-center gap-2 text-[#f0e0c8]/80 text-sm">
            <Calendar size={16} className="text-[#d4a574]" />
            <span>
              Leído del <strong className="text-[#f0e0c8]">{formatDate(fechaInicio)}</strong>
              {' '}al{' '}
              <strong className="text-[#f0e0c8]">{formatDate(fechaFin)}</strong>
            </span>
          </div>
        )}

        {/* Reseña */}
        {resena && (
          <section>
            <h3 className="text-[#d4a574] text-xs uppercase tracking-widest mb-2 font-bold">
              Mi reseña
            </h3>
            <p className="text-[#f0e0c8]/90 text-sm leading-relaxed">
              {resena}
            </p>
          </section>
        )}

        {/* Frase favorita */}
        {fraseFav && (
          <section className="relative bg-[#1c0e0e]/50 rounded-2xl p-5 border-l-4 border-[#d4a574]">
            <Quote size={20} className="text-[#d4a574]/40 absolute top-3 right-4" />
            <h3 className="text-[#d4a574] text-xs uppercase tracking-widest mb-2 font-bold">
              Frase favorita
            </h3>
            <p className="text-[#f0e0c8]/90 text-sm italic leading-relaxed">
              "{fraseFav}"
            </p>
          </section>
        )}

        {/* Canción */}
        {(cancion || cantante) && (
          <section className="flex items-center gap-3 bg-[#1c0e0e]/30 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-[#6B2737] flex items-center justify-center flex-shrink-0">
              <Music size={18} className="text-[#f0e0c8]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[#d4a574] text-[10px] uppercase tracking-wider font-bold">
                Me hizo pensar en
              </h3>
              <p className="text-[#f0e0c8] text-sm truncate">
                {cancion || 'Sin título'}
                {cantante && <span className="text-[#a08070]"> · {cantante}</span>}
              </p>
            </div>
          </section>
        )}

        {/* Sí/No badges */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {libroUnico && (
            <div className="bg-[#1c0e0e]/40 rounded-xl p-3">
              <p className="text-[#d4a574] text-[10px] uppercase tracking-wider font-bold mb-1">
                ¿Libro único?
              </p>
              <p className="text-[#f0e0c8] text-sm">
                {libroUnico === 'si' ? '✓ Sí, es único' : '✗ Parte de una saga'}
              </p>
            </div>
          )}

          {protagonista !== null && protagonista !== undefined && (
            <div className="bg-[#1c0e0e]/40 rounded-xl p-3">
              <p className="text-[#d4a574] text-[10px] uppercase tracking-wider font-bold mb-1">
                Protagonista
              </p>
              <p className="text-[#f0e0c8] text-sm flex items-center gap-1">
                {protagonista ? (
                  <><Heart size={14} className="text-[#d4a574] fill-[#d4a574]" /> Me cayó bien</>
                ) : (
                  '✗ No me cayó bien'
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}