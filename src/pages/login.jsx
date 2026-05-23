import { useState } from "react";

function SignIn() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        alert("Sesión iniciada (simulada)");
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
            
            <div className="fixed inset-0 w-full h-full z-0">
                <img 
                    src="/signinimg.png" 
                    alt="background"
                    className="w-full h-full object-cover blur-2xl scale-110"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>
            {/* Contenedor principal: Bordes más rústicos y sombra cálida */}
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-[#d9b382] min-h-[600px]">

                {/* Lado Izquierdo: Imagen decorativa */}
                <div className="hidden md:block w-1/2 relative border-r border-[#8c6d46]/20">
                    <img
                        src="/signinimg.png"
                        className="absolute -mt-2 inset-0 h-[150%] w-[150%] object-cover sepia-[0.2] brightness-60"
                        alt="imgsignin"
                    />

                    <div className="absolute inset-0 bg-[#5c4033]/20 flex p-12 items-end">
                        <h3 className="text-4xl text-[#fdf5e6] font-serif leading-tight drop-shadow-lg">
                            Tus libros te<br /> están esperando
                        </h3>
                    </div>
                </div>

                <div className="relative w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center z-10 bg-[#baa470] text-[#3d2b1f]">
                    
                   <h2 className="text-4xl font-serif mb-8 text-center md:text-left text-[#5c4033] tracking-tight">Sign In</h2>
                    <p className="text-sm text-[#4e4039] mb-6 text-center md:text-left">
                        Inicia Sesión con tu cuenta de lector
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] mb-2 text-[#554839] font-bold">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder="Tu nombre de usuario o email"
                                className="w-full bg-transparent border-b border-[#8c6d46]/40 py-2 focus:outline-none focus:border-[#5c4033] transition-colors placeholder:text-[#8c6d46]/50 text-lg"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-[0.2em] mb-2 text-[#554839] font-bold">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="******"
                                value={formData.password}
                                className="w-full bg-transparent border-b border-[#8c6d46]/40 py-2 focus:outline-none focus:border-[#5c4033] transition-colors placeholder:text-[#8c6d46]/50 text-lg"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            className="w-full py-4 mt-6 bg-slate-900 p-4 hover:bg-slate-800  text-[#f4e4bc] rounded-xl font-bold text-xl shadow-teal-900/40 transition-all transform hover:-translate-y-0.5"
                            type="submit"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    
                    <div className="mt-12 text-sm text-center md:text-left text-[#8c6d46]">
                        ¿Nuevo? <span className="mt-8 text-sm text-blue-800/70 hover:text-yellow-200 underline underline-offset-4 mx-auto md:mx-0">Crea una cuenta</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;