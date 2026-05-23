import Sidebar from '../componentes/sidebar';
import { useBooks } from '../context/BooksContext';
import { BarChart2, BookOpen, BookMarked, CheckCheck, Star, TrendingUp } from 'lucide-react';
 
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-[#1c0e0e] border border-[#3d2020] rounded-2xl p-5 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + '22', border: `1px solid ${color}44` }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-[#a08070] text-xs uppercase tracking-widest">{label}</p>
        <p className="text-[#f0e0c8] text-3xl font-serif font-medium mt-0.5">{value}</p>
      </div>
    </div>
  );
}
 
function BarItem({ label, count, max, color }) {
  const pct = max === 0 ? 0 : Math.round((count / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#a08070] text-xs w-28 truncate flex-shrink-0">{label}</span>
      <div className="flex-1 bg-[#2b1616] rounded-full h-2 overflow-hidden">
        <div className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[#f0e0c8] text-xs w-4 text-right">{count}</span>
    </div>
  );
}
 
function RatingBar({ stars, count, max }) {
  const pct = max === 0 ? 0 : Math.round((count / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#d4a574] text-xs w-16 flex-shrink-0">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
      <div className="flex-1 bg-[#2b1616] rounded-full h-2 overflow-hidden">
        <div className="h-2 rounded-full bg-[#d4a574] transition-all duration-500"
          style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[#a08070] text-xs w-4 text-right">{count}</span>
    </div>
  );
}
 
export default function Analytics() {
  const { getLibrosPor } = useBooks();
 
  const leidos     = getLibrosPor('leidos');
  const leyendo    = getLibrosPor('leyendo');
  const quieroLeer = getLibrosPor('quiero-leer');
  const todos      = [...leidos, ...leyendo, ...quieroLeer];
 
  // Promedio de rating
  const conRating  = leidos.filter(l => l.rating > 0);
  const promedioRating = conRating.length
    ? (conRating.reduce((s, l) => s + l.rating, 0) / conRating.length).toFixed(1)
    : '—';
 
  // Distribución de ratings
  const ratingDist = [5, 4, 3, 2, 1].map(n => ({
    stars: n,
    count: leidos.filter(l => l.rating === n).length,
  }));
  const maxRating = Math.max(...ratingDist.map(r => r.count), 1);
 
  // Top autores
  const autoresCont = {};
  todos.forEach(l => {
    if (l.autor) autoresCont[l.autor] = (autoresCont[l.autor] || 0) + 1;
  });
  const topAutores = Object.entries(autoresCont)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxAutor = topAutores[0]?.[1] || 1;
 
  // Páginas totales
  const paginasTotales = leidos.reduce((s, l) => s + (parseInt(l.paginas) || 0), 0);
 
  return (
    <div className="flex h-screen bg-[#12060f] overflow-hidden">
      <Sidebar />
 
      <main className="flex-1 overflow-y-auto px-8 py-6">
        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#6B2737] flex items-center justify-center text-[#f0e0c8]">
            <BarChart2 size={20} />
          </div>
          <div>
            <h1 className="text-[#f0e0c8] font-serif text-2xl font-medium">Analytics</h1>
            <p className="text-[#a08070] text-sm">Tu actividad lectora</p>
          </div>
        </div>
 
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={CheckCheck}  label="Leídos"       value={leidos.length}     color="#6B2737" />
          <StatCard icon={BookOpen}    label="Leyendo"      value={leyendo.length}    color="#3d5a80" />
          <StatCard icon={BookMarked}  label="Pendientes"   value={quieroLeer.length} color="#5a3d20" />
          <StatCard icon={TrendingUp}  label="En total"     value={todos.length}      color="#4a6741" />
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Promedio rating */}
          <div className="bg-[#1c0e0e] border border-[#3d2020] rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <Star size={20} className="text-[#d4a574] mb-1" />
            <p className="text-[#f0e0c8] text-5xl font-serif">{promedioRating}</p>
            <p className="text-[#a08070] text-xs uppercase tracking-widest">Rating promedio</p>
          </div>
 
          {/* Páginas */}
          <div className="bg-[#1c0e0e] border border-[#3d2020] rounded-2xl p-5 flex flex-col items-center justify-center gap-1">
            <BookOpen size={20} className="text-[#6B2737] mb-1" />
            <p className="text-[#f0e0c8] text-5xl font-serif">
              {paginasTotales > 0 ? paginasTotales.toLocaleString() : '—'}
            </p>
            <p className="text-[#a08070] text-xs uppercase tracking-widest">Páginas leídas</p>
          </div>
 
          {/* Distribución ratings */}
          <div className="bg-[#1c0e0e] border border-[#3d2020] rounded-2xl p-5">
            <p className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold mb-4">
              Distribución de ratings
            </p>
            <div className="flex flex-col gap-2.5">
              {ratingDist.map(r => (
                <RatingBar key={r.stars} stars={r.stars} count={r.count} max={maxRating} />
              ))}
            </div>
          </div>
        </div>
 
        {/* Top autores */}
        {topAutores.length > 0 && (
          <div className="bg-[#1c0e0e] border border-[#3d2020] rounded-2xl p-5">
            <p className="text-[#d4a574] text-[10px] uppercase tracking-widest font-bold mb-4">
              Autores más leídos
            </p>
            <div className="flex flex-col gap-3">
              {topAutores.map(([autor, count]) => (
                <BarItem key={autor} label={autor} count={count} max={maxAutor} color="#6B2737" />
              ))}
            </div>
          </div>
        )}
 
        {/* Estado vacío */}
        {todos.length === 0 && (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
            <BarChart2 size={36} className="text-[#3d2020]" />
            <p className="text-[#a08070] text-sm max-w-xs">
              Agrega libros para ver tus estadísticas aquí.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}