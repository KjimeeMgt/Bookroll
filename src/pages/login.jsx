import { useState } from "react";

function SignIn(){
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados:", formData);
        alert("Sesión iniciada (simulada)");
    };

    return(
        <div style={{ padding:'20px'}}>
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <label>Username: </label> <br />
                <input
                    type="text"
                    name="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /> <br />
                <label>Password: </label> <br />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    /> <br />
                
                    <button type="submit">Sign in</button>
            </form>
        </div>
    )
}
export default SignIn;