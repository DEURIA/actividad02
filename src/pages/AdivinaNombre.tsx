import React from "react";
// Importa el hook con la lógica del juego
import { useAdivinaNombre } from "../hooks/useAdivinaNombre";
// Importa el componente que muestra la tarjeta del personaje y mensajes
import AdivinaNombreCard from "../components/AdivinaCard";

export default function AdivinaNombrePage() {
  // Extraemos todo lo necesario desde el hook personalizado
  const {
    character,
    inputValue,
    setInputValue,
    status,
    loading,
    checkGuess,
    score,
    round,
    correctName,
    showAnswer,
    resetGame,
    MAX_ROUNDS,
  } = useAdivinaNombre();

  // Variable booleana para saber si el juego terminó
  const isFinished = status === "finished";

  // Función que actualiza el valor del input conforme escribe el usuario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Al enviar el formulario, se previene la recarga y se verifica la respuesta
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkGuess();
  };

  return (
    <main style={styles.page}>
      <h1>Adivina el nombre del personaje</h1>

      {/* Muestra la información de la ronda actual y puntaje */}
      <div style={styles.scoreInfo}>
        <p>Ronda: {Math.min(round, MAX_ROUNDS)} / {MAX_ROUNDS}</p>
        <p>Puntos: {score}</p>
      </div>

      {/* Mientras carga, muestra mensaje de carga */}
      {loading && <p>Cargando personaje...</p>}

      {/* Si ya cargó y hay personaje, muestra la tarjeta y el formulario o botón según estado */}
      {!loading && character && (
        <>
          {/* Componente que muestra la imagen y mensajes según estado */}
          <AdivinaNombreCard
            character={character}
            status={status}
            showAnswer={showAnswer}
            correctName={correctName}
            score={score}
            isFinished={isFinished}
            maxRounds={MAX_ROUNDS}
          />

          {/* Si el juego no terminó, muestra el formulario para adivinar */}
          {!isFinished && (
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="text"
                placeholder="Escribe el nombre..."
                value={inputValue}
                onChange={handleInputChange}
                style={styles.input}
                // Deshabilita el input si el estado no es "idle" (es decir, mientras muestra resultado)
                disabled={status !== "idle"}
                autoFocus
              />
              <button
                type="submit"
                disabled={status !== "idle"} // Botón deshabilitado mientras no esté listo para adivinar
                style={styles.button}
              >
                Adivinar
              </button>
            </form>
          )}

          {/* Si el juego terminó, muestra botón para reiniciar */}
          {isFinished && (
            <button onClick={resetGame} style={styles.resetButton}>
              Reiniciar juego
            </button>
          )}
        </>
      )}
    </main>
  );
}

// Estilos en línea para la página y sus elementos
const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 400,
    margin: "40px auto",
    padding: 16,
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  scoreInfo: {
    marginBottom: 12,
    fontSize: 16,
    color: "#444",
  },
  form: {
    marginTop: 16,
    display: "flex",
    gap: 8,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 16px",
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#007acc",
    color: "white",
    cursor: "pointer",
  },
  resetButton: {
    marginTop: 20,
    padding: "10px 20px",
    fontSize: 16,
    borderRadius: 6,
    border: "none",
    backgroundColor: "#dc3545",
    color: "white",
    cursor: "pointer",
  },
};
