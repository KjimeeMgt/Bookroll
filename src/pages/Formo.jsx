// src/pages/formop.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import FormOP from '../componentes/FormOP';
import { api } from '../api';

export default function FormOPPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const libro = location.state?.libro || {
    cover: 'https://picsum.photos/200/300',
    titulo: 'The Happiness Effect',
  };

  const handleSubmit = async (datos) => {
    await api.createOpinion({
      libro: {
        cover:  libro.cover,
        titulo: libro.titulo,
        autor:  libro.autor,
      },
      opinion: datos,
    });
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
