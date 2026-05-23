// src/componentes/Rating.jsx
import { useState } from 'react';

function Rating({ value = 0, onChange, max = 5, size = 'md', readonly = false }) {
  const [hover, setHover] = useState(0);

  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => {
        const num = i + 1;
        const filled = num <= (hover || value);

        return (
          <button
            key={num}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(num)}
            onMouseEnter={() => !readonly && setHover(num)}
            onMouseLeave={() => !readonly && setHover(0)}
            className={`${sizes[size]} leading-none transition-transform ${
              filled ? 'text-[#d4a574]' : 'text-[#7a4a4a]'
            } ${!readonly && 'hover:scale-110 cursor-pointer'}`}
          >
            {filled ? '★' : '☆'}
          </button>
        );
      })}
    </div>
  );
}

export default Rating;