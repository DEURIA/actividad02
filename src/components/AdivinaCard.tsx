// Importa el tipo de datos del personaje desde la interfaz
import type { RMCharacter } from "../usuariosLogin/interfaces/rickmorty.interface";

// Define las propiedades (props) que recibe el componente
interface AdivinaCardProps {
  character: RMCharacter;                      // Personaje actual con imagen, nombre, etc.
  status: "idle" | "correct" | "wrong" | "finished"; // Estado del juego en ese momento
  showAnswer: boolean;                         // Si debe mostrar el nombre correcto tras error
  correctName: string;                         // Nombre correcto del personaje
  score: number;                               // Puntaje acumulado del usuario
  isFinished: boolean;                         // Si se ha completado el juego
  maxRounds: number;                           // Número máximo de rondas (ej: 5)
}

// Componente funcional que muestra la tarjeta del personaje y mensajes
export default function AdivinaCard({
  character,
  status,
  showAnswer,
  correctName,
  score,
  isFinished,
  maxRounds,
}: AdivinaCardProps) {
  return (
    <div style={styles.card}>
      {/* Imagen del personaje */}
      <img src={character.image} alt={character.name} style={styles.image} />

      {/* Si el usuario adivinó correctamente, muestra mensaje verde */}
      {status === "correct" && (
        <p style={{ ...styles.message, color: "green" }}>¡Correcto!</p>
      )}

      {/* Si el usuario se equivocó, muestra mensaje rojo y el nombre correcto */}
      {status === "wrong" && (
        <>
          <p style={{ ...styles.message, color: "red" }}>Incorrecto.</p>

          {/* Si showAnswer está activo, muestra el nombre real del personaje */}
          {showAnswer && (
            <p style={{ ...styles.message, color: "#555" }}>
              El nombre era: <strong>{correctName}</strong>
            </p>
          )}
        </>
      )}

      {/* Si el juego terminó, muestra puntaje final */}
      {isFinished && (
        <div style={styles.finalMessage}>
          <p style={{ fontWeight: "bold" }}>Juego terminado</p>
          <p>
            Tu puntaje: <strong>{score}</strong> de {maxRounds}
          </p>
        </div>
      )}
    </div>
  );
}

// Estilos en línea para el componente
const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    maxWidth: 280,
    margin: "0 auto",
  },
  image: {
    width: "100%",
    borderRadius: 12,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
  },
  finalMessage: {
    marginTop: 12,
    fontSize: 16,
    color: "#222",
  },
};
