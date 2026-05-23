import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, saveSession } from "../api";

function SignUp() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }
        try {
            await api.register({ username: formData.username, email: formData.email, password: formData.password });
            const tokens = await api.login({ email: formData.email, password: formData.password });
            saveSession(tokens);
            navigate('/home');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">

            <div className="fixed inset-0 w-full h-full z-0">
                <img
                    src="/signupimg.png"
                    alt="background"
                    className="w-full h-full object-cover blur-2xl scale-110"
                />
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#1a2e35] min-h-[600px]">

                <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md -z-10"></div>

                    <h2 className="text-4xl font-serif mb-8 text-yellow-100 text-center md:text-left">Sign Up</h2>

                    {error && (
                        <p className="text-red-300 bg-red-900/30 rounded-lg px-4 py-2 text-sm mb-4">{error}</p>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-1 text-gray-400">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Tu nombre de usuario"
                                className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-yellow-200 transition-colors"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs uppercase tracking-widest mb-1 text-gray-400">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-yellow-200 transition-colors"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className="block text-xs uppercase tracking-widest mb-1 text-gray-400">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-yellow-200"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-xs uppercase tracking-widest mb-1 text-gray-400">Confirm</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-yellow-200"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className="w-full py-4 mt-4 bg-[#baa470] hover:bg-[#5c4033] text-[#1a2e35] hover:text-white rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1"
                            type="submit">
                            Crear cuenta
                        </button>
                    </form>

                    <div className="mt-12 text-sm text-center md:text-left text-[#8c6d46]">
                        <Link to="/signin" className="text-yellow-200 hover:text-[#3d2b1f] underline underline-offset-4 transition-colors">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                     </div>
                </div>

                <div className="hidden md:block w-1/2 relative overflow-hidden">
                    <img
                        src="/signupimg.png"
                        className="absolute -m-1 inset-0 h-[120%] w-[120%] object-cover"
                        alt="imgsignup"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e35] via-[#1a2e35]/20 to-transparent p-12 flex items-end">
                        <h3 className="text-4xl text-yellow-100 font-serif leading-tight">
                            Una nueva<br /> aventura te<br /> espera
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
