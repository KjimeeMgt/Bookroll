import { Routes, Route } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import RequireAuth     from './componentes/RequireAuth';
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
import Calendario      from './pages/Calendario';
import Analytics       from './pages/Analytics';

function App() {
  return (
    <BooksProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/"       element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected routes */}
        <Route path="/home"         element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/quiero-leer"  element={<RequireAuth><IwRead /></RequireAuth>} />
        <Route path="/leyendo"      element={<RequireAuth><Reading /></RequireAuth>} />
        <Route path="/leidos"       element={<RequireAuth><Leidos /></RequireAuth>} />
        <Route path="/agregar"      element={<RequireAuth><AgregarLibro /></RequireAuth>} />
        <Route path="/formop"       element={<RequireAuth><FormOPPage /></RequireAuth>} />
        <Route path="/misopiniones" element={<RequireAuth><MisOpiniones /></RequireAuth>} />
        <Route path="/calendario"   element={<RequireAuth><Calendario /></RequireAuth>} />
        <Route path="/analytics"    element={<RequireAuth><Analytics /></RequireAuth>} />
      </Routes>
    </BooksProvider>
  );
}

export default App;
