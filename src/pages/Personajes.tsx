import { useNavigate } from "react-router-dom"; // Hook de navegación de react-router para cambiar de ruta de codigo xq mo uso link


import { getCurrentUser, signOut } from "../auth";
import { useCharacters } from "../hooks/useCharacters"; // Hook personalizado para manejar la lógica de personajes
import SearchBar from "../components/SearchBar";
import CharacterCard from "../components/CharacterCard";
import Pager from "../components/Pager";

export default function Personajes() {
  const navigate = useNavigate();// Hook de navegación de react-router
  const user = getCurrentUser();// Obtiene el usuario actual del localStorage

  
  const {
    characters, page, totalPages,
    inputValue, setInputValue,
    loading, errorMsg,
    onSearchSubmit, nextPage, prevPage
  } = useCharacters();//Usa el hook personalizado para manejar la lógica de personajes

  const handleLogout = () => {
    signOut();// Limpia el localStorage
    navigate("/login", { replace: true });//Redirige al login
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>Personajes</h2>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <SearchBar
            value={inputValue}
            onChange={setInputValue}
            onSubmit={onSearchSubmit}
          />
          <span style={{ fontSize: 14, color: "#555" }}>
            Sesión: <b>{user?.email}</b>
          </span>
          <button onClick={handleLogout} style={styles.logout}>Cerrar sesión</button>
        </div>
      </div>

      <Pager
        page={page}
        totalPages={totalPages}
        onPrev={prevPage}
        onNext={nextPage}
      />

      {loading && <p style={{ marginTop: 12 }}>Cargando...</p>}
      {errorMsg && !loading && <p style={styles.error}>{errorMsg}</p>}
      {!loading && !errorMsg && characters.length === 0 && (
        <p style={{ marginTop: 12 }}>Sin datos para mostrar.</p>
      )}

      <div style={styles.grid}>
        {characters.map((ch) => (
          <CharacterCard key={ch.id} ch={ch} />
        ))}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: { maxWidth: 1100, margin: "40px auto", padding: "0 16px" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12 },
  logout: { padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8, background: "white", cursor: "pointer" },
  error: { color: "#c62828", marginTop: 12, fontSize: 14 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 },
};
