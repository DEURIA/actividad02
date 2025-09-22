import React from "react";
// Importa React para poder definir el componente funcional

import { usePuzzle } from "../hooks/usePuzzle";
// Importa el hook personalizado que maneja la lógica del puzzle

import PuzzleCard from "../components/PuzzleCard";
// Importa el componente visual que renderiza el puzzle y las piezas

export default function PuzzlePage() {
  // Extraemos todos los datos y funciones del hook usePuzzle
  const {
    character,      // El personaje actual (con imagen, nombre, etc)
    pieces,         // Las piezas del puzzle (con posición y id)
    swapPieces,     // Función para intercambiar piezas
    solved,         // Booleano que indica si el puzzle está resuelto
    imageLoaded,    // Booleano que indica si la imagen cargó correctamente
    setImageLoaded, // Función para marcar la imagen como cargada
    GRID_SIZE,      // Tamaño del grid (3 en este caso)
    fetchCharacter, // Función para reiniciar el puzzle con un nuevo personaje
  } = usePuzzle();

  return (
    <main style={styles.page}>
      {/* Título principal de la página */}
      <h1>Rompecabezas Rick & Morty</h1>

      {/* Si el personaje aún no se ha cargado, muestra mensaje de carga */}
      {!character && <p>Cargando personaje...</p>}

      {/* Si ya hay personaje cargado, muestra el puzzle y botón reiniciar */}
      {character && (
        <>
          {/* Componente que muestra el puzzle con todas sus piezas */}
          <PuzzleCard
            character={character}     // Personaje a mostrar
            pieces={pieces}           // Las piezas actuales desordenadas
            gridSize={GRID_SIZE}      // Tamaño de la cuadrícula (3)
            onSwap={swapPieces}       // Función para intercambiar piezas
            solved={solved}           // Estado que indica si ya se resolvió
            imageLoaded={imageLoaded} // Si la imagen cargó para mostrar piezas
            onImageLoad={() => setImageLoaded(true)} // Marca imagen como cargada
          />

          {/* Botón para reiniciar el juego y cargar otro personaje */}
          <button onClick={fetchCharacter} style={styles.button}>
            Reiniciar
          </button>
        </>
      )}
    </main>
  );
}

// Estilos en línea para la página y botón
const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: 400,             // Máximo ancho del contenedor
    margin: "40px auto",       // Centrar vertical y horizontalmente con margen arriba
    padding: 16,               // Espacio interno
    textAlign: "center",       // Centrar texto
    fontFamily: "Arial, sans-serif", // Tipo de letra
  },
  button: {
    marginTop: 20,             // Separación arriba del botón
    padding: "10px 20px",      // Espacio interno del botón
    fontSize: 16,              // Tamaño de letra
    borderRadius: 6,           // Bordes redondeados
    border: "none",            // Sin borde
    backgroundColor: "#007acc",// Color de fondo azul
    color: "white",            // Color de texto blanco
    cursor: "pointer",         // Cursor tipo mano para indicar clickeable
  },
  solvedMessage: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
};
