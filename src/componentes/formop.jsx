// src/componentes/FormOP.jsx
import { useState } from 'react';
import Rating from './Rating';
import Button from './Button';

export default function FormOP({ cover, titulo, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    rating: 0,
    resena: '',
    fraseFav: '',
    fechaInicio: '',
    fechaFin: '',
    cancion: '',
    cantante: '',
    libroUnico: '',
    protagonista: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (num) => setFormData({ ...formData, rating: num });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Opinión enviada:', formData);
    onSubmit?.(formData);
  };

  return (
    <div className="min-h-screen w-full bg-[#2b1616] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-[#3d2020]/40 border border-[#7a4a4a]/30 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.5fr] shadow-2xl"
      >
        <div className="bg-[#d4a574] p-8 flex items-center justify-center">
          {cover ? (
            <img
              src={cover}
              alt={titulo}
              className="w-full max-w-[280px] aspect-[2/3] object-cover rounded-xl shadow-2xl"
            />
          ) : (
            <div className="w-full max-w-[280px] aspect-[2/3] bg-gradient-to-br from-[#6B2737] to-[#3d2020] rounded-xl flex items-center justify-center text-[#f0e0c8] font-serif text-xl text-center px-4">
              {titulo || 'Sin portada'}
            </div>
          )}
        </div>

        <div className="p-8 md:p-10 space-y-6">
          <h2 className="font-serif text-[#f0e0c8] text-4xl font-medium">
            ¿Qué te pareció?
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[#d4a574] text-xs uppercase tracking-wider font-semibold block mb-2">
                Calificación
              </label>
              <Rating value={formData.rating} onChange={handleRating} size="md" />
            </div>

            <div>
              <label className="text-[#d4a574] text-xs uppercase tracking-wider font-semibold block mb-2">
                Fecha de lectura
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="fechaInicio"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  className="flex-1 bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-lg px-3 py-2 text-[#f0e0c8] text-xs outline-none focus:border-[#d4a574]"
                />
                <input
                  type="date"
                  name="fechaFin"
                  value={formData.fechaFin}
                  onChange={handleChange}
                  className="flex-1 bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-lg px-3 py-2 text-[#f0e0c8] text-xs outline-none focus:border-[#d4a574]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[#d4a574] text-xs uppercase tracking-wider font-semibold block mb-2">
              ¿Danos tu reseña?
            </label>
            <textarea
              name="resena"
              value={formData.resena}
              onChange={handleChange}
              placeholder="Escribe aquí..."
              rows={3}
              className="w-full bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-xl px-4 py-3 text-[#f0e0c8] placeholder-[#a08070]/60 text-sm outline-none focus:border-[#d4a574] resize-none"
            />
          </div>

          <div>
            <label className="text-[#d4a574] text-xs uppercase tracking-wider font-semibold block mb-2">
              ¿En qué canción pensaste?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="cancion"
                value={formData.cancion}
                onChange={handleChange}
                placeholder="Nombre"
                className="bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-xl px-4 py-2.5 text-[#f0e0c8] placeholder-[#a08070]/60 text-sm outline-none focus:border-[#d4a574]"
              />
              <input
                type="text"
                name="cantante"
                value={formData.cantante}
                onChange={handleChange}
                placeholder="Cantante"
                className="bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-xl px-4 py-2.5 text-[#f0e0c8] placeholder-[#a08070]/60 text-sm outline-none focus:border-[#d4a574]"
              />
            </div>
          </div>

          <div>
            <label className="text-[#d4a574] text-xs uppercase tracking-wider font-semibold block mb-2">
              Frase favorita
            </label>
            <textarea
              name="fraseFav"
              value={formData.fraseFav}
              onChange={handleChange}
              placeholder="Escribe aquí..."
              rows={2}
              className="w-full bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-xl px-4 py-3 text-[#f0e0c8] placeholder-[#a08070]/60 text-sm outline-none focus:border-[#d4a574] resize-none"
            />
          </div>

          <div>
            <label className="text-[#d4a574] text-xs uppercase tracking-wider font-semibold block mb-2">
              ¿Es libro único?
            </label>
            <select
              name="libroUnico"
              value={formData.libroUnico}
              onChange={handleChange}
              className="w-full bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-xl px-4 py-2.5 text-[#f0e0c8] text-sm outline-none focus:border-[#d4a574]"
            >
              <option value="">Elegir...</option>
              <option value="si">Sí, es único</option>
              <option value="no">No, es parte de una saga</option>
            </select>
          </div>

          <div>
            <label className="text-[#d4a574] text-xs uppercase tracking-wider font-semibold block mb-2">
              ¿Me cayó bien la protagonista?
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, protagonista: true })}
                className={`flex-1 py-2 rounded-xl border transition ${
                  formData.protagonista === true
                    ? 'bg-[#6B2737] text-[#f0e0c8] border-[#7a4a4a]'
                    : 'bg-[#1c0e0e] text-[#f0e0c8]/70 border-[#7a4a4a]/40 hover:bg-[#3d2020]'
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, protagonista: false })}
                className={`flex-1 py-2 rounded-xl border transition ${
                  formData.protagonista === false
                    ? 'bg-[#6B2737] text-[#f0e0c8] border-[#7a4a4a]'
                    : 'bg-[#1c0e0e] text-[#f0e0c8]/70 border-[#7a4a4a]/40 hover:bg-[#3d2020]'
                }`}
              >
                No
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {onCancel && (
              <Button variant="ghost" onClick={onCancel} type="button">
                Cancelar
              </Button>
            )}
            <Button variant="primary" type="submit" className="flex-1">
              Guardar opinión
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}