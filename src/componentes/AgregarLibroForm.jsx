// src/componentes/AgregarLibroForm.jsx
import { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import Button from './Button';
import Input from './Input';
import { ETIQUETAS } from '../context/BooksContext';

const ETIQUETA_OPCIONES = [
  { value: ETIQUETAS.QUIERO_LEER, label: 'Quiero leer' },
  { value: ETIQUETAS.LEYENDO,     label: 'Leyendo'     },
  { value: ETIQUETAS.LEIDO,       label: 'Leído'       },
];

export default function AgregarLibroForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    titulo:      '',
    autor:       '',
    editorial:   '',
    paginas:     '',
    descripcion: '',
    frase:       '',
    cover:       '',
    etiqueta:    ETIQUETAS.LEYENDO,
    rating:      0,
  });
  const [preview, setPreview]   = useState(null);
  const [errores, setErrores]   = useState({});

  const set = (campo, valor) =>
    setForm((prev) => ({ ...prev, [campo]: valor }));

  const handleCover = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    set('cover', url);
  };

  const validar = () => {
    const e = {};
    if (!form.titulo.trim())  e.titulo  = 'El título es obligatorio';
    if (!form.autor.trim())   e.autor   = 'El autor es obligatorio';
    if (!form.etiqueta)       e.etiqueta = 'Elige una etiqueta';
    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 w-full">

      {/* ── Columna izquierda: portada ── */}
      <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
        <label className="cursor-pointer w-full group">
          <input type="file" accept="image/*" className="hidden" onChange={handleCover} />

          <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden border-2 border-dashed border-[#7a4a4a]/40 bg-[#1c0e0e] flex items-center justify-center group-hover:border-[#6B2737] transition-colors">
            {preview ? (
              <img src={preview} alt="portada" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-[#a08070]">
                <ImagePlus size={36} />
                <span className="text-xs">Subir portada</span>
              </div>
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              {preview && (
                <span className="opacity-0 group-hover:opacity-100 text-[#f0e0c8] text-xs bg-[#1c0e0e]/70 px-3 py-1 rounded-full transition-opacity">
                  Cambiar imagen
                </span>
              )}
            </div>
          </div>
        </label>

        {/* Rating */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold">
            Tu calificación
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set('rating', n === form.rating ? 0 : n)}
                className={`text-xl transition-transform hover:scale-125 ${
                  n <= form.rating ? 'text-[#d4a574]' : 'text-[#3d2020]'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Columna derecha: campos ── */}
      <div className="flex flex-col gap-4 flex-1">

        {/* Título */}
        <div>
          <label className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold block mb-1">
            Título *
          </label>
          <Input
            value={form.titulo}
            onChange={(e) => set('titulo', e.target.value)}
            placeholder="Nombre del libro"
          />
          {errores.titulo && <p className="text-red-400 text-xs mt-1">{errores.titulo}</p>}
        </div>

        {/* Autor */}
        <div>
          <label className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold block mb-1">
            Autor *
          </label>
          <Input
            value={form.autor}
            onChange={(e) => set('autor', e.target.value)}
            placeholder="Nombre del autor"
          />
          {errores.autor && <p className="text-red-400 text-xs mt-1">{errores.autor}</p>}
        </div>

        {/* Editorial y Páginas */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold block mb-1">
              Editorial
            </label>
            <Input
              value={form.editorial}
              onChange={(e) => set('editorial', e.target.value)}
              placeholder="Editorial"
            />
          </div>
          <div className="w-28">
            <label className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold block mb-1">
              Páginas
            </label>
            <Input
              type="number"
              value={form.paginas}
              onChange={(e) => set('paginas', e.target.value)}
              placeholder="000"
            />
          </div>
        </div>

        {/* Frase favorita */}
        <div>
          <label className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold block mb-1">
            Frase favorita
          </label>
          <Input
            value={form.frase}
            onChange={(e) => set('frase', e.target.value)}
            placeholder="Una cita que te gustó..."
          />
        </div>

        {/* Sinopsis */}
        <div>
          <label className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold block mb-1">
            Sinopsis
          </label>
          <textarea
            value={form.descripcion}
            onChange={(e) => set('descripcion', e.target.value)}
            placeholder="De qué trata el libro..."
            rows={3}
            className="w-full bg-[#1c0e0e] border border-[#7a4a4a]/40 rounded-xl px-4 py-3 text-[#f0e0c8] text-sm placeholder:text-[#a08070] focus:outline-none focus:border-[#6B2737] resize-none"
          />
        </div>

        {/* Etiqueta */}
        <div>
          <label className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold block mb-2">
            Etiquetar como *
          </label>
          <div className="flex gap-2">
            {ETIQUETA_OPCIONES.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => set('etiqueta', value)}
                className={`flex-1 py-2 rounded-xl text-sm border transition-colors ${
                  form.etiqueta === value
                    ? 'bg-[#6B2737] border-[#6B2737] text-[#f0e0c8] font-medium'
                    : 'bg-transparent border-[#7a4a4a]/40 text-[#a08070] hover:border-[#6B2737] hover:text-[#f0e0c8]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {errores.etiqueta && <p className="text-red-400 text-xs mt-1">{errores.etiqueta}</p>}
        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-2">
          <Button type="button" variant="ghost" size="md" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" variant="primary" size="md" className="flex-1">
            Guardar libro
          </Button>
        </div>
      </div>
    </form>
  );
}
