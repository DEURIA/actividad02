// src/layouts/ProtectedLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

// Este layout solo se usa después de que el usuario está autenticado
export default function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <main style={styles.main}>
        <Outlet />
      </main>
    </>
  );
}

const styles = {
  main: {
    padding: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
};
