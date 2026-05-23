const Chip = ({ icon, children, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex ml-1 items-center gap-2 px-4 py-2 mb-10 rounded-full text-sm border backdrop-blur-sm hover:scale-[1.08] ${
        active
          ? 'bg-transparent text-[#f0e0c8] border-[#7a4a4a] font-medium'
          : 'bg-[#3d2020]/70 text-[#f0e0c8] border-[#7a4a4a]/40 font-normal'
      }`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Chip;