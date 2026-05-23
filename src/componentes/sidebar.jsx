import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Library, Bookmark, ListChecks, Calendar, LogOut, BookOpen, PlusCircle, MessageSquare, BarChart2 } from 'lucide-react';
import SidebarItem from './SidebarItem';
 
const items = [
  { id: 'home',         icon: <Home size={20} />,          label: 'Inicio',        path: '/home'          },
  { id: 'quiero-leer',  icon: <Library size={20} />,       label: 'Quiero leer',   path: '/quiero-leer'   },
  { id: 'leyendo',      icon: <Bookmark size={20} />,      label: 'Leyendo',       path: '/leyendo'       },
  { id: 'leidos',       icon: <ListChecks size={20} />,    label: 'Leídos',        path: '/leidos'        },
  { id: 'calendario',   icon: <Calendar size={20} />,      label: 'Calendario',    path: '/calendario'    },
  { id: 'analytics',    icon: <BarChart2 size={20} />,     label: 'Analytics',     path: '/analytics'     },
  { id: 'agregar',      icon: <PlusCircle size={20} />,    label: 'Agregar libro', path: '/agregar'       },
  { id: 'opiniones',    icon: <MessageSquare size={20} />, label: 'Mis opiniones', path: '/misopiniones'  },
];
 
function Sidebar({ expanded = false }) {
  const navigate = useNavigate();
  const location = useLocation();
 
  return (
    <aside className={`bg-[#1c0e0e] border-r border-[#3d2020] py-6 flex flex-col items-center gap-3 h-screen sticky top-0 ${expanded ? 'w-56 px-3' : 'w-20'}`}>
      <div className="w-11 h-11 rounded-2xl bg-[#6B2737] flex items-center justify-center text-[#f0e0c8] mb-4">
        <BookOpen size={24} />
      </div>
 
      <nav className="flex flex-col gap-2 flex-1 w-full items-center overflow-y-auto">
        {items.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            expanded={expanded}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>
 
      <SidebarItem
        icon={<LogOut size={20} />}
        label="Salir"
        expanded={expanded}
        onClick={() => navigate('/signin')}
      />
    </aside>
  );
}
 
export default Sidebar;