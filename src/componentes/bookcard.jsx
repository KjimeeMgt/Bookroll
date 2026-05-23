// src/componentes/BookCard.jsx
import Rating from './Rating';

function BookCard({
  cover,
  titulo,
  autor,
  rating,
  badge,
  size = 'md',
  onClick,
}) {
  const sizes = {
    sm: { titulo: 'text-xs', autor: 'text-[10px]' },
    md: { titulo: 'text-sm', autor: 'text-xs' },
    lg: { titulo: 'text-base', autor: 'text-sm' },
  };

  // Iniciales del título para el fallback (si no hay portada)
  const placeholderText = titulo
    ? titulo.split(' ').slice(0, 3).map((w) => w[0]).join('').toUpperCase()
    : '?';

  return (
    <div
      onClick={onClick}
      className={`group flex flex-col ${
        onClick && 'cursor-pointer'
      }`}
    >
      {/* Portada */}
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl group-hover:scale-[1.03] transition-all duration-300">
        {cover ? (
          <img
            src={cover}
            alt={titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#6B2737] to-[#3d2020] flex items-center justify-center">
            <span className="font-serif text-3xl text-[#f0e0c8]/60">
              {placeholderText}
            </span>
          </div>
        )}

        {/* Badge en la esquina (Nuevo, Popular, etc.) */}
        {badge && (
          <span className="absolute top-2 left-2 bg-[#d4a574] text-[#2b1616] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        )}

        {/* Overlay sutil al hacer hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>

      {/* Info debajo de la portada */}
      <div className="mt-2.5">
        <p className={`text-[#f0e0c8] font-medium truncate ${sizes[size].titulo}`}>
          {titulo}
        </p>
        <p className={`text-[#a08070] truncate ${sizes[size].autor}`}>
          {autor}
        </p>

        {rating !== undefined && (
          <div className="mt-1">
            <Rating value={rating} readonly size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;