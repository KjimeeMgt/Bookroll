// src/componentes/SidebarItem.jsx

function SidebarItem({
  icon,
  label,
  active = false,
  expanded = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      title={!expanded ? label : undefined}
      className={`group relative flex items-center gap-3 rounded-xl transition-all ${
        expanded ? 'w-full px-3 py-2.5 justify-start' : 'w-11 h-11 justify-center'
      } ${
        active
          ? 'bg-[#3d2020] text-[#d4a574] border border-[#7a4a4a]/40'
          : 'text-[#f0e0c8]/50 hover:text-[#f0e0c8] hover:bg-[#3d2020]/50'
      }`}
    >
      <span className="text-xl flex-shrink-0">{icon}</span>

      {expanded && (
        <span className={`text-sm font-medium ${active && 'text-[#d4a574]'}`}>
          {label}
        </span>
      )}

      {/* Tooltip que aparece al hover SOLO en modo colapsado */}
      {!expanded && (
        <span className="absolute left-full ml-3 px-2 py-1 rounded-md bg-[#1c0e0e] border border-[#7a4a4a]/40 text-[#f0e0c8] text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
          {label}
        </span>
      )}
    </button>
  );
}

export default SidebarItem;