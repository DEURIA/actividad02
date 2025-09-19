import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Personajes from "./pages/Personajes";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} /> {/**Aca me muestra el formulario */}

      <Route element={<ProtectedRoute />}>{/**y po aca es la ruta protegida pero en caso de salir bien me redirigira a personajes */}
        <Route path="/personajes" element={<Personajes />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

//Esto es para las rutas, donde se encuentra cada pagina y si es protegida o no
//El componente ProtectedRoute se encarga de verificar si el usuario esta logueado o no
//Si no esta logueado, redirige al login
//Si esta logueado, permite el acceso a la ruta protegida
//En este caso, la unica ruta protegida es /personajes
//La ruta /login es accesible para todos los usuarios

//Es decir aca si si hay me lleva a personaes sino me rederiza el formulario