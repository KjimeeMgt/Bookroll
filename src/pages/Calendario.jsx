import './calendario.css';

import { useState, useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../componentes/sidebar';
import Infobook from '../componentes/Infobook';
import { useBooks } from '../context/BooksContext';
import { CalendarDays } from 'lucide-react';
 
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales: { es },
});
 
const MENSAJES = {
  next:         'Siguiente',
  previous:     'Anterior',
  today:        'Hoy',
  month:        'Mes',
  week:         'Semana',
  day:          'Día',
  agenda:       'Agenda',
  date:         'Fecha',
  time:         'Hora',
  event:        'Libro',
  noEventsInRange: 'No hay libros en este período.',
};
 
export default function Calendario() {
  const { getLibrosPor } = useBooks();
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
 
  // Convertir libros leídos en eventos del calendario
  const eventos = useMemo(() => {
    const leidos      = getLibrosPor('leidos');
    const leyendo     = getLibrosPor('leyendo');
    const quieroLeer  = getLibrosPor('quiero-leer');
 
    const toEventos = (libros, color) =>
      libros.map((libro, i) => {
        const base = new Date();
        base.setDate(base.getDate() - i * 3);
        return {
          title:    libro.titulo,
          start:    base,
          end:      base,
          resource: { ...libro, color },
        };
      });
 
    return [
      ...toEventos(leidos,     '#6B2737'),
      ...toEventos(leyendo,    '#3d5a80'),
      ...toEventos(quieroLeer, '#5a3d20'),
    ];
  }, [getLibrosPor]);
 
  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.resource.color,
      border:          'none',
      borderRadius:    '6px',
      color:           '#f0e0c8',
      fontSize:        '11px',
      padding:         '2px 6px',
    },
  });
 
  return (
    <div className="flex h-screen bg-[#12060f] overflow-hidden">
      <Sidebar />
 
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#6B2737] flex items-center justify-center text-[#f0e0c8]">
            <CalendarDays size={20} />
          </div>
          <div>
            <h1 className="text-[#f0e0c8] font-serif text-2xl font-medium">Calendario</h1>
            <p className="text-[#a08070] text-sm">Tu historial de lectura</p>
          </div>
        </div>
 
        {/* Leyenda */}
        <div className="flex gap-4 mb-4">
          {[
            { color: '#6B2737', label: 'Leídos'      },
            { color: '#3d5a80', label: 'Leyendo'     },
            { color: '#5a3d20', label: 'Quiero leer' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-[#a08070] text-xs">{label}</span>
            </div>
          ))}
        </div>
 
        {/* Calendario */}
        <div className="calendario-wrapper rounded-2xl overflow-hidden border border-[#3d2020]" style={{ height: '70vh' }}>
          <Calendar
            localizer={localizer}
            events={eventos}
            startAccessor="start"
            endAccessor="end"
            culture="es"
            messages={MENSAJES}
            eventPropGetter={eventStyleGetter}
            onSelectEvent={(event) => setLibroSeleccionado(event.resource)}
            style={{ height: '100%' }}
          />
        </div>
 
        {/* Nota si no hay libros */}
        {eventos.length === 0 && (
          <p className="text-center text-[#a08070] text-sm mt-6">
            Aún no tienes libros registrados. Agrega libros desde{' '}
            <span className="text-[#f0e0c8]">Agregar libro</span>.
          </p>
        )}
      </main>
 
      {/* Infobook al hacer clic en un evento */}
      {libroSeleccionado && (
        <Infobook
          isOpen={!!libroSeleccionado}
          onClose={() => setLibroSeleccionado(null)}
          titulo={libroSeleccionado.titulo}
          autor={libroSeleccionado.autor}
          cover={libroSeleccionado.cover}
          descripcion={libroSeleccionado.descripcion}
          editorial={libroSeleccionado.editorial}
          paginas={libroSeleccionado.paginas}
          frase={libroSeleccionado.frase}
          rating={libroSeleccionado.rating}
        />
      )}
    </div>
  );
}