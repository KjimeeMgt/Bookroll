// src/componentes/Sidebar.jsx — con ruta /agregar
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Library, Bookmark, Calendar, ListChecks, LogOut, BookOpen, PlusCircle } from 'lucide-react';
import SidebarItem from './SidebarItem';

const items = [
  { id: 'home',      icon: <Home size={20} />,       label: 'Inicio',       path: '/home'            },
  { id: 'IwRead', icon: <Library size={20} />,    label: 'Quiero leer',  path: '/IwRead' },
  { id: 'Reading',     icon: <Bookmark size={20} />,   label: 'Leyendo',      path: '/Reading'     },
  { id: 'leidos',      icon: <ListChecks size={20} />, label: 'Leídos',       path: '/leidos'      },
  { id: 'calendario',  icon: <Calendar size={20} />,   label: 'Calendario',   path: '/calendario'  },
  { id: 'agregar',     icon: <PlusCircle size={20} />, label: 'Agregar libro',path: '/agregarlibroform'     },
];

function Sidebar({ expanded = false }) {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <aside
      className={`bg-[#1c0e0e] border-r border-[#3d2020] py-6 flex flex-col items-center gap-3 h-screen sticky top-0 ${
        expanded ? 'w-56 px-3' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="w-11 h-11 rounded-2xl bg-[#6B2737] flex items-center justify-center text-[#f0e0c8] text-xl mb-4">
        <BookOpen size={24} />
      </div>

      {/* Items */}
      <nav className="flex flex-col gap-2 flex-1 w-full items-center">
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

      {/* Salir */}
      <SidebarItem
        icon={<LogOut size={20} />}
        label="Salir"
        expanded={expanded}
        onClick={() => navigate('/login')}
      />
    </aside>
  );
}

export default Sidebar;
