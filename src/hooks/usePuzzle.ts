import { useEffect, useState } from "react"; 
// Importa los hooks useEffect y useState para manejar estado y efectos secundarios

import axios from "axios"; 
// Importa axios para hacer peticiones HTTP

import type { RMCharacter } from "../usuariosLogin/interfaces/rickmorty.interface"; 
// Importa el tipo de datos RMCharacter para tipar la respuesta de la API

export function usePuzzle() {
  // Define constante con tamaño del grid, 3x3 en este caso
  const GRID_SIZE = 3;

  // Total de piezas es GRID_SIZE al cuadrado (3x3 = 9 piezas)
  const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;

  // Estado que guarda el personaje actual, inicialmente null (no cargado)
  const [character, setCharacter] = useState<RMCharacter | null>(null);

  // Estado que guarda las piezas actuales del puzzle, representadas por sus IDs (números)
  const [pieces, setPieces] = useState<number[]>([]);

  // Estado booleano para saber si la imagen ya se cargó
  const [imageLoaded, setImageLoaded] = useState(false);

  // Estado booleano para saber si el puzzle está resuelto
  const [solved, setSolved] = useState(false);

  // Función para mezclar las piezas aleatoriamente (algoritmo Fisher-Yates)
  const shufflePieces = () => {
    // Crea un arreglo con números del 0 al TOTAL_PIECES - 1
    const arr = Array.from({ length: TOTAL_PIECES }, (_, i) => i);

    // Recorre el arreglo desde el final hacia el principio para hacer swaps aleatorios
    for (let i = arr.length - 1; i > 0; i--) {
      // Escoge un índice aleatorio entre 0 y i
      const j = Math.floor(Math.random() * (i + 1));

      // Intercambia los valores en i y j
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    // Devuelve el arreglo mezclado
    return arr;
  };

  // Función para obtener un personaje aleatorio y reiniciar el puzzle
  const fetchCharacter = async () => {
    // Genera un id aleatorio entre 1 y 826 (total personajes API Rick & Morty)
    const randomId = Math.floor(Math.random() * 826) + 1;

    // Hace petición HTTP para obtener el personaje con ese id
    const { data } = await axios.get<RMCharacter>(
      `https://rickandmortyapi.com/api/character/${randomId}`
    );

    // Guarda el personaje obtenido en el estado
    setCharacter(data);

    // Mezcla las piezas y las guarda en el estado
    setPieces(shufflePieces());

    // Resetea solved a false porque el puzzle es nuevo
    setSolved(false);

    // Resetea imageLoaded porque aún falta cargar la imagen nueva
    setImageLoaded(false);
  };

  // useEffect para que al montar el hook ejecute fetchCharacter (cargue personaje y puzzle)
  useEffect(() => {
    fetchCharacter();
  }, []);

  // Función para intercambiar dos piezas dado sus índices i y j
  const swapPieces = (i: number, j: number) => {
    // Actualiza el estado pieces con una copia modificada
    setPieces((prev) => {
      const newPieces = [...prev]; // Copia el arreglo actual

      // Intercambia las posiciones i y j en la copia
      [newPieces[i], newPieces[j]] = [newPieces[j], newPieces[i]];

      // Revisa si todas las piezas están en orden (id igual al índice)
      // Si es así, marca solved como true (puzzle resuelto)
      setSolved(newPieces.every((val, idx) => val === idx));

      // Devuelve el nuevo arreglo para actualizar el estado
      return newPieces;
    });
  };

  // Función que convierte el arreglo de piezas (números) en objetos PuzzlePiece con info extra
  const getPuzzlePieces = () =>
    pieces.map((id, index) => ({
      id,                        // ID de la pieza (posición original)
      currentPos: index,          // Posición actual de la pieza en el tablero
      row: Math.floor(id / GRID_SIZE),  // Fila original donde debería estar la pieza
      col: id % GRID_SIZE,              // Columna original donde debería estar la pieza
    }));

  // Devuelve un objeto con los estados y funciones para usar en componentes
  return {
    character,            // Personaje cargado
    pieces: getPuzzlePieces(),  // Piezas con info extra para renderizar
    swapPieces,           // Función para intercambiar piezas
    solved,               // Estado que indica si el puzzle está resuelto
    imageLoaded,          // Estado que indica si la imagen cargó
    setImageLoaded,       // Función para cambiar el estado de carga de imagen
    GRID_SIZE,            // Tamaño del grid (para renderizar)
    fetchCharacter,       // Función para reiniciar el puzzle con otro personaje
  };
}
