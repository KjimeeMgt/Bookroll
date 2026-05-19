import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home - Bienvenido a Bookroll</h1>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;