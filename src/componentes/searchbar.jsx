// src/componentes/SearchBar.jsx
import Input from './Input';
import Button from './Button';

function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Busca tus libros favoritos...',
  showButton = true,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  // Ícono lupa que se pasa al Input
  const lupaIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
      />
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
      <div className="flex-1">
        <Input
          type="search"
          name="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          icon={lupaIcon}
        />
      </div>

      {showButton && (
        <Button type="submit" variant="primary" size="md">
          Buscar
        </Button>
      )}
    </form>
  );
}

export default SearchBar;