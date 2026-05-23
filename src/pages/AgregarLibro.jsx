// src/pages/AgregarLibro.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Sidebar from '../componentes/sidebar';
import AgregarLibroForm from '../componentes/AgregarLibroForm';
import Infobook from '../componentes/Infobook';
import { useBooks } from '../context/BooksContext';

export default function AgregarLibro() {
  const navigate    = useNavigate();
  const { etiquetar } = useBooks();

  const [libroGuardado, setLibroGuardado] = useState(null); // libro recién creado
  const [infobookOpen, setInfobookOpen]   = useState(false); // modal de detalle

  const handleSubmit = (datos) => {
    const nuevoLibro = {
      id:          `libro-${Date.now()}`,
      titulo:      datos.titulo,
      autor:       datos.autor,
      cover:       datos.cover  || null,
      frase:       datos.frase  || '',
      descripcion: datos.descripcion || '',
      editorial:   datos.editorial   || '',
      paginas:     datos.paginas     || '',
      rating:      datos.rating      || 0,
      badge:       null,
    };

    // Guardar en el contexto con la etiqueta elegida
    etiquetar(nuevoLibro, datos.etiqueta);

    // Mostrar infobook para confirmar
    setLibroGuardado({ ...nuevoLibro, etiqueta: datos.etiqueta });
    setInfobookOpen(true);
  };

  const handleCerrarInfobook = () => {
    setInfobookOpen(false);
    // Redirigir a la lista de la etiqueta elegida
    navigate(`/${libroGuardado.etiqueta}`);
  };

  return (
    <div className="flex h-screen bg-[#12060f] overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto px-8 py-6">

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#6B2737] flex items-center justify-center text-[#f0e0c8]">
            <Plus size={20} />
          </div>
          <div>
            <h1 className="text-[#f0e0c8] font-serif text-2xl font-medium">Agregar libro</h1>
            <p className="text-[#a08070] text-sm">Ingresa los datos y etiquétalo de una vez</p>
          </div>
        </div>

        {/* Formulario */}
        <div className="max-w-4xl bg-[#1c0e0e] border border-[#3d2020] rounded-3xl p-8">
          <AgregarLibroForm
            onSubmit={handleSubmit}
            onCancel={() => navigate(-1)}
          />
        </div>
      </main>

      {/* Infobook — confirmación al guardar */}
      {libroGuardado && (
        <Infobook
          isOpen={infobookOpen}
          onClose={handleCerrarInfobook}
          cover={libroGuardado.cover}
          titulo={libroGuardado.titulo}
          autor={libroGuardado.autor}
          frase={libroGuardado.frase}
          descripcion={libroGuardado.descripcion}
          editorial={libroGuardado.editorial}
          paginas={libroGuardado.paginas}
          rating={libroGuardado.rating}
        />
      )}
    </div>
  );
}
