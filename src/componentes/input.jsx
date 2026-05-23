// src/componentes/Input.jsx

function Input({ 
    label, 
    type = 'text', 
    name, 
    value,
    onChange,
    icon, 
    placeholder
 }) {
  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="absolute -top-2 left-3 px-1.5 bg-[#2b1616] text-[11px] text-[#a08070] tracking-wider z-10"
        >
          {label}
        </label>
      )}

      {icon && (
        <span className="absolute left-3 top-3 text-[#a08070]">{icon}</span>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full bg-[#3d2020]/60 border border-[#7a4a4a]/40 rounded-xl
          py-3 px-4 text-[#f0e0c8] placeholder-[#a08070]/60 text-sm
          outline-none focus:border-[#d4a574] focus:ring-2 focus:ring-[#d4a574]/30
          transition
          ${icon ? 'pl-10' : ''}
        `}
      />
    </div>
  );
}

export default Input;