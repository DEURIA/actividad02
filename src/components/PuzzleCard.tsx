import React, { useState } from "react"; 
// Importa React y el hook useState para manejar estado local dentro del componente

import type { RMCharacter } from "../usuariosLogin/interfaces/rickmorty.interface"; 
// Importa el tipo RMCharacter que define la estructura del personaje de Rick & Morty

// Define la estructura que tendrá cada pieza del rompecabezas
interface PuzzlePiece {
  id: number;          // Identificador único de la pieza, basado en su posición original
  currentPos: number;  // Posición actual de la pieza en el tablero (no usada en este componente pero útil para lógica externa)
  row: number;         // Fila donde debería estar la pieza (posicion original)
  col: number;         // Columna donde debería estar la pieza (posicion original)
}

// Define las propiedades (props) que recibe el componente PuzzleCard
interface PuzzleCardProps {
  character: RMCharacter;         // Personaje con imagen e info para usar en el puzzle
  pieces: PuzzlePiece[];          // Arreglo con piezas y su estado actual
  gridSize: number;               // Tamaño del grid (ej: 3 para 3x3)
  onSwap: (i: number, j: number) => void; // Función que intercambia piezas, recibe dos índices
  solved: boolean;                // Indica si el puzzle está resuelto
  imageLoaded: boolean;           // Indica si la imagen del personaje ya terminó de cargar
  onImageLoad: () => void;        // Callback para indicar que la imagen se cargó
}

// Componente  muestra el rompecabezas
export default function PuzzleCard({
  character,
  pieces,
  gridSize,
  onSwap,
  solved,
  imageLoaded,
  onImageLoad,
}: PuzzleCardProps) {
  const puzzleSize = 300; // Tamaño total en pixeles del área del puzzle (ancho y alto)
  const pieceSize = puzzleSize / gridSize; // Tamaño de cada pieza calculado dividiendo el tamaño total por el número de piezas por fila

  // Estado local para guardar qué pieza está seleccionada (índice), inicialmente ninguna (null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Función que maneja el click en una pieza del rompecabezas
  const handlePieceClick = (index: number) => {
    if (selectedIndex === null) {
      // Si no hay ninguna pieza seleccionada, selecciona la que se clickeó
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      // Si haces clic en la misma pieza ya seleccionada, la deselecciona (toggle)
      setSelectedIndex(null);
    } else {
      // Si ya había una pieza seleccionada distinta, se intercambian las dos piezas
      onSwap(selectedIndex, index);
      // Después de intercambiar, deselecciona (resetea) la selección
      setSelectedIndex(null);
    }
  };

  return (
    <div style={styles.container}>
      {/* Título con el nombre del personaje */}
      <h2 style={styles.title}>Rompecabezas de {character.name}</h2>

      {/* Imagen oculta que se usa para que el navegador la cargue y ejecutar onImageLoad */}
      <img
        src={character.image}
        alt={character.name}
        onLoad={onImageLoad}      // Cuando termina de cargar la imagen, llama al callback para actualizar estado externo
        style={{ display: "none" }} // La imagen no se muestra (solo se carga en background)
      />

      {/* Contenedor principal del puzzle, usando CSS Grid para mostrar las piezas */}
      <div
        style={{
          ...styles.board,
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`, // Define columnas iguales según gridSize
          width: puzzleSize,   // Ancho fijo del puzzle
          height: puzzleSize,  // Alto fijo del puzzle
        }}
      >
        {/* Si la imagen ya está cargada, renderiza las piezas */}
        {imageLoaded &&
          pieces.map((piece, index) => {
            // Calcula la fila y columna original de la pieza basado en su id
            const originalRow = Math.floor(piece.id / gridSize);
            const originalCol = piece.id % gridSize;

            // Indica si esta pieza está seleccionada para darle un borde diferente
            const isSelected = index === selectedIndex;

            return (
              <div
                key={piece.id}                // Key único para React, importante para renderizado eficiente
                onClick={() => handlePieceClick(index)} // Al hacer clic llama a la función para seleccionar o intercambiar
                style={{
                  ...styles.piece,
                  width: pieceSize,   // Ancho de la pieza
                  height: pieceSize,  // Alto de la pieza
                  backgroundImage: `url(${character.image})`, // Usa la imagen del personaje como fondo
                  
                  // Posiciona el fondo para mostrar la parte correcta de la imagen según la pieza
                  backgroundPosition: `${(originalCol * 100) / (gridSize - 1)}% ${(originalRow * 100) / (gridSize - 1)}%`,
                  
                  // Tamaño del fondo igual al tamaño total del puzzle para que encaje perfecto
                  backgroundSize: `${puzzleSize}px ${puzzleSize}px`,

                  // Borde azul si está seleccionado, gris si no
                  border: isSelected ? "2px solid #007acc" : "1px solid #aaa",
                }}
              />
            );
          })}
      </div>

      {/* Si el puzzle está resuelto, muestra mensaje de éxito */}
      {solved && <p style={styles.message}>¡Lo lograste!</p>}
    </div>
  );
}

// Objeto con estilos CSS en línea para cada parte del componente
const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#f9f9f9",                 
    borderRadius: 12,                           
    padding: 20,                                 
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",   
    textAlign: "center",                         
    maxWidth: 360,                               
    margin: "0 auto",                            
  },
  title: {
    fontSize: 20,    
    marginBottom: 16,
    color: "#333",   
  },
  board: {
    display: "grid",    
    gap: 2,             
    border: "2px solid #ccc", 
    marginBottom: 16,   
  },
  piece: {
    cursor: "pointer",     
    backgroundRepeat: "no-repeat",  
    backgroundSize: "cover",        
    borderRadius: 4,                
    transition: "border 0.2s",    
  },
  message: {
    marginTop: 12,          
    fontSize: 16,          
    fontWeight: "bold",   
    color: "green",        
  },
};
