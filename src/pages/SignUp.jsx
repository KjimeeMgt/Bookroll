import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '' // Fíjate en la P mayúscula
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        console.log("Datos enviados:", formData);
        alert("Registro exitoso (simulado)");
    };

    return (
        <div style={{ padding: '20px'}}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label><br />
                <input type="text" name="username" value={formData.username} onChange={handleChange} required /><br />
                
                <label>Email:</label><br />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required /><br />
                
                <label>Password:</label><br />
                <input type="password" name="password" value={formData.password} onChange={handleChange} required /><br />
                
                <label>Confirm Password:</label><br />
                <input 
                    type="password" 
                    name="confirmPassword" // ANTES: "confirmpassword" (debe ser igual al del useState)
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                    required 
                /><br /><br />

                <button type="submit">Crear cuenta</button> 
            </form>

            <p>¿Ya tienes cuenta? <Link to="/signin">Inicia sesión</Link></p>
        </div>
    );
}

export default SignUp;