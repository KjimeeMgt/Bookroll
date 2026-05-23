import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/login';
import LandingPage from './pages/landing';
import FormOPPage from './pages/formo';
import MisOpiniones from './pages/misopiniones';
import Home from './pages/Home';
import IwRead from './pages/IwRead';
import Reading from './pages/Reading';
import Leidos from './pages/leidos';
import AgregarLibroForm from './componentes/AgregarLibroForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home - Bienvenido a Bookroll</h1>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/formop" element={<FormOPPage />} />
      <Route path="/misopiniones" element={<MisOpiniones />} />
      <Route path="/home" element={<Home />} />
      <Route path="/IwRead" element={<IwRead />} />
      <Route path="/Reading" element={<Reading />} />
      <Route path="/leidos" element={<Leidos />} />
      <Route path="/agregarlibroform" element={<AgregarLibroForm />} />
    </Routes>
  );
}

export default App;