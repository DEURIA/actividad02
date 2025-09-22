// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout"; // ⬅️ Importa el layout
import Login from "./pages/Login";
import Personajes from "./pages/Personajes";
import AdivinaNombre from "./pages/AdivinaNombre";
import Puzzle from "./pages/Puzzle";

export default function App() {
  
    return (
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />
        
      
        
  
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/adivina-nombre" element={<AdivinaNombre />} />
            <Route path="/puzzle" element={<Puzzle />} />
          </Route>
        </Route>
  
        {/* Redirecciones */}
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