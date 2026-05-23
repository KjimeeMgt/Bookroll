// src/componentes/SectionHeader.jsx
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SectionHeader({
  title,
  onPrev,
  onNext,
  showArrows = true,
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-[#f0e0c8] font-serif text-2xl font-medium">
        {title}
      </h2>

      {showArrows && (
        <div className="flex gap-2">
          <button
            onClick={onPrev}
            className="w-9 h-9 rounded-full bg-[#3d2020] border border-[#7a4a4a]/40 text-[#f0e0c8] flex items-center justify-center hover:bg-[#5a3333] transition"
            aria-label="Anterior"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={onNext}
            className="w-9 h-9 rounded-full bg-[#6B2737] text-[#f0e0c8] flex items-center justify-center hover:bg-[#7d3247] transition"
            aria-label="Siguiente"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}