// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import SignUp          from './pages/SignUp';
import SignIn          from './pages/login';
import LandingPage     from './pages/landing';
import FormOPPage      from './pages/Formo';
import MisOpiniones    from './pages/misopiniones';
import Home            from './pages/Home';
import IwRead          from './pages/IwRead';
import Reading         from './pages/Reading';
import Leidos          from './pages/leidos';
import AgregarLibro    from './pages/AgregarLibro';
 
function App() {
  return (
    <BooksProvider>
      <Routes>
        <Route path="/"               element={<LandingPage />} />
        <Route path="/signup"         element={<SignUp />} />
        <Route path="/signin"         element={<SignIn />} />
        <Route path="/home"           element={<Home />} />
        <Route path="/quiero-leer"    element={<IwRead />} />
        <Route path="/leyendo"        element={<Reading />} />
        <Route path="/leidos"         element={<Leidos />} />
        <Route path="/agregar"        element={<AgregarLibro />} />
        <Route path="/formop"         element={<FormOPPage />} />
        <Route path="/misopiniones"   element={<MisOpiniones />} />
      </Routes>
    </BooksProvider>
  );
}
 
export default App;