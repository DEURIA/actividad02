// src/components/Navbar.tsx
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../auth";

// Importamos algunos íconos desde react-icons (FontAwesome y Material Design)
import { FaUserAstronaut, FaGamepad, FaSignOutAlt, FaDragon, FaPuzzlePiece } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login", { replace: true });
  };

  return (
    <header style={styles.navbar}>
      <nav style={styles.nav}>
        {/* Logo + Nombre */}
        <Link to="/personajes" style={styles.logo}>
          <FaDragon size={28} style={{ marginRight: 8 }} />
          <span>Rick & Morty Fan</span>
        </Link>

        {/* Links de navegación */}
        <ul style={styles.ul}>
          <li style={styles.li}>
            <Link to="/personajes" style={styles.link}>
              <FaUserAstronaut style={{ marginRight: 6 }} />
              Personajes
            </Link>
          </li>
          <li style={styles.li}>
            <Link to="/adivina-nombre" style={styles.link}>
              <FaGamepad style={{ marginRight: 6 }} />
              Adivinar Nombre
            </Link>
          </li>
          <li style={styles.li}>
          <Link to="/puzzle" style={styles.link}>
          <FaPuzzlePiece style={{ marginRight: 6 }} />
            Puzzle
          </Link>
          </li>
        </ul>

        {/* Botón cerrar sesión */}
        <button onClick={handleLogout} style={styles.logoutButton}>
          <FaSignOutAlt style={{ marginRight: 6 }} />
          Cerrar sesión
        </button>
      </nav>
    </header>
  );
}

const styles: Record<string, React.CSSProperties> = {
  navbar: {
    backgroundColor: "#282c34",
    padding: "1rem 2rem",
    color: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textDecoration: "none",
  },
  ul: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    gap: "1.5rem",
  },
  li: {
    fontSize: 16,
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
  },
};
