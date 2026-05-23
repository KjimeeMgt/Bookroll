// src/componentes/Avatar.jsx

function Avatar({
  src,
  name = '',
  size = 'md',
  status,
  onClick,
}) {
  const sizes = {
    xs: { box: 'w-7 h-7', text: 'text-xs', dot: 'w-2 h-2' },
    sm: { box: 'w-9 h-9', text: 'text-sm', dot: 'w-2.5 h-2.5' },
    md: { box: 'w-11 h-11', text: 'text-base', dot: 'w-3 h-3' },
    lg: { box: 'w-16 h-16', text: 'text-xl', dot: 'w-3.5 h-3.5' },
    xl: { box: 'w-24 h-24', text: 'text-3xl', dot: 'w-4 h-4' },
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  // Genera las iniciales: "Kal Sanchez" → "KS", "Kal" → "K"
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  const { box, text, dot } = sizes[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center ${box} ${
        onClick && 'cursor-pointer hover:scale-105 transition-transform'
      }`}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className={`${box} rounded-full object-cover border-2 border-[#7a4a4a]/40`}
        />
      ) : (
        <div
          className={`${box} ${text} rounded-full bg-[#6B2737] text-[#f0e0c8] font-semibold flex items-center justify-center border-2 border-[#7a4a4a]/40`}
        >
          {initials || '?'}
        </div>
      )}

      {status && (
        <span
          className={`absolute bottom-0 right-0 ${dot} ${statusColors[status]} rounded-full ring-2 ring-[#2b1616]`}
        />
      )}
    </div>
  );
}

export default Avatar;