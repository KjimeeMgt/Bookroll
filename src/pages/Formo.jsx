// src/pages/formop.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import FormOP from '../componentes/FormOP';

export default function FormOPPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const libro = location.state?.libro || {
    cover: 'https://picsum.photos/200/300',
    titulo: 'The Happiness Effect',
  };

  const handleSubmit = (datos) => {
    const opiniones = JSON.parse(localStorage.getItem('opiniones')) || [];
    opiniones.push({
          id: Date.now(),
          libro,
          opinion: datos,
      });
    localStorage.setItem('opiniones', JSON.stringify(opiniones));
    alert('Opinión guardada:\n');
    navigate('/misopiniones');
  };

  return (
    <FormOP
      cover={libro.cover}
      titulo={libro.titulo}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}