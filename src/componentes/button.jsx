const Button = ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    type = "button",
    onClick,
    className = "",
}) => {
    const variants = {
        primary: 'bg-[#f0e0c8] text-[#2b1616] hover:bg-[#e8d5b7]',
        secondary: 'bg-[#6B2737] text-[#f0e0c8] hover:bg-[#7d3247]',
        ghost: 'bg-transparent text-[#f0e0c8] border border-[#7a4a4a]/40 hover:bg-[#3d2020]/60',
        danger: 'bg-[#8b2027] text-[#f0e0c8] hover:bg-[#a02530]',
        icon: 'bg-[#3d2020] text-[#f0e0c8] hover:bg-[#5a3333] !p-2 !rounded-full',
 
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
             className={`
            inline-flex items-center justify-center gap-2 rounded-full font-semibold
            transition-all hover:scale-[1.02]
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            ${variants[variant]} ${sizes[size]} ${className}
            `}
            >
                {loading ? 'Cargando...' : children}
            </button>
            
    );
};
export default Button;