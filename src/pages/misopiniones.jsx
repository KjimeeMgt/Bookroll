// src/pages/misOpiniones.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpinionCard from '../componentes/OpinionCard';
import Button from '../componentes/Button';

export default function MisOpiniones() {
  const [opiniones, setOpiniones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('opiniones')) || [];
    setOpiniones(stored);
  }, []);

  const handleDelete = (id) => {
    const filtradas = opiniones.filter((o) => o.id !== id);
    setOpiniones(filtradas);
    localStorage.setItem('opiniones', JSON.stringify(filtradas));
  };

  return (
    <div className="min-h-screen bg-[#2b1616] p-10">
      <h1 className="text-[#f0e0c8] font-serif text-4xl mb-8">Mis opiniones</h1>

      {opiniones.length === 0 ? (
        <div className="text-center text-[#a08070] py-20">
          <p className="text-lg">Aún no tienes opiniones guardadas.</p>
          <p className="text-sm mt-2">Lee un libro y comparte qué te pareció.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {opiniones.map((item) => (
            <OpinionCard
              key={item.id}
              cover={item.libro?.cover}
              titulo={item.libro?.titulo}
              autor={item.libro?.autor}
              opinion={item.opinion}
              onEdit={() => alert('Editar opinión')}
              onDelete={() => handleDelete(item.id)}
            />
          ))}
        </div>
      )}

      <Button variant="primary" className="mt-10" onClick={() => navigate('/home')}>
        Volver a la página principal
      </Button>
    </div>
  );
}