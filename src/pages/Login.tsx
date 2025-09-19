

//**ESTOS ES MI PAGINA DE FORMULARIO DEL EMAIL + PASSWORD */
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, signIn } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Si ya hay sesión, entra directo a /personajes
  useEffect(() => {
    if (getCurrentUser()) navigate("/personajes", { replace: true });
  }, [navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg("Por favor completa ambos campos.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const ok = signIn(email, password);
      setLoading(false);
      if (ok) {
        navigate("/personajes", { replace: true });
      } else {
        setErrorMsg("Credenciales inválidas. Verifica email y contraseña.");
      }
    }, 200);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={onSubmit} style={styles.card}>
        <h2>Iniciar sesión</h2>

        <label style={styles.label}>Correo electrónico</label>
        <input
          type="email"
          placeholder="email@dominio.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          autoComplete="username"
        />

        <label style={styles.label}>Contraseña</label>
        <input
          type="password"
          placeholder="•••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          autoComplete="current-password"
        />

        {errorMsg && <p style={styles.error}>{errorMsg}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
//esto es para los estilos del formulario, podria haberlo en un css pero lo hice asi para practicar
const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f6f8" },
  card: { width: 340, background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,.08)", display: "flex", flexDirection: "column", gap: 8 },
  label: { fontSize: 12, color: "#333", marginTop: 6 },
  input: { padding: "10px 12px", borderRadius: 8, border: "1px solid #d9d9d9", outline: "none" },
  button: { marginTop: 12, padding: "10px 12px", border: "none", borderRadius: 8, background: "#1e88e5", color: "white", cursor: "pointer" },
  error: { color: "#c62828", marginTop: 8, fontSize: 13 },
};
