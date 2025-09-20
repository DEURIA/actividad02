import { useEffect, useState } from "react";
import axios from "axios";
import type { RMCharacter } from "../usuariosLogin/interfaces/rickmorty.interface";

// Función que normaliza texto: quita acentos, convierte a minúsculas y elimina espacios extras
function normalizeText(text: string) {
  return text
    .normalize("NFD")                   // Descompone caracteres con acentos
    .replace(/[\u0300-\u036f]/g, "")   // Quita los acentos
    .toLowerCase()                     // Convierte a minúsculas
    .trim();                          // Elimina espacios al inicio y final
}

// Hook personalizado que controla la lógica del juego "Adivina el nombre"
export function useAdivinaNombre() {
  // Estado del personaje actual (objeto o null si no hay)
  const [character, setCharacter] = useState<RMCharacter | null>(null);
  // Valor del input donde el usuario escribe su adivinanza
  const [inputValue, setInputValue] = useState("");
  // Estado del resultado: "idle" (sin respuesta), "correct" (acertó), "wrong" (falló) o "finished" (terminado)
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "finished">("idle");
  // Estado que indica si se está cargando la imagen/personaje
  const [loading, setLoading] = useState(true);

  // Puntuación acumulada del jugador
  const [score, setScore] = useState(0);
  // Ronda actual (de 1 a MAX_ROUNDS)
  const [round, setRound] = useState(1);
  // Controla si se debe mostrar el nombre correcto tras un error
  const [showAnswer, setShowAnswer] = useState(false);
  // Guarda el nombre correcto para mostrar cuando el usuario falla
  const [correctName, setCorrectName] = useState("");

  // Número máximo de rondas que dura el juego
  const MAX_ROUNDS = 5;

  // Función que obtiene un personaje aleatorio desde la API
  const fetchRandomCharacter = async () => {
    try {
      setLoading(true);         // Muestra indicador de carga
      setStatus("idle");        // Resetea el estado de respuesta
      setInputValue("");        // Limpia el input
      setShowAnswer(false);     // Oculta la respuesta correcta

      // Genera un id aleatorio de personaje entre 1 y 826
      const randomId = Math.floor(Math.random() * 826) + 1;
      // Llama a la API para obtener el personaje
      const { data } = await axios.get<RMCharacter>(
        `https://rickandmortyapi.com/api/character/${randomId}`
      );
      // Guarda el personaje en el estado
      setCharacter(data);
    } catch (error) {
      console.error("Error fetching character:", error);
      setCharacter(null);       // Si falla, pone null
    } finally {
      setLoading(false);        // Quita indicador de carga
    }
  };

  // useEffect para cargar el primer personaje al montar el hook
  useEffect(() => {
    fetchRandomCharacter();
  }, []);

  // Función que revisa si la respuesta del usuario es correcta
  const checkGuess = () => {
    // Si no hay personaje o el juego ya terminó, no hace nada
    if (!character || status === "finished") return;

    // Normaliza la respuesta del usuario y el nombre correcto para comparar
    const userGuess = normalizeText(inputValue);
    const correct = normalizeText(character.name);

    if (userGuess === correct) {
      // Si es correcto, aumenta el puntaje y cambia el estado a "correct"
      setScore(prev => prev + 1);
      setStatus("correct");
    } else {
      // Si es incorrecto, guarda el nombre correcto para mostrar y cambia el estado a "wrong"
      setCorrectName(character.name);
      setStatus("wrong");
      setShowAnswer(true);
    }

    // Después de 2 segundos, pasa a la siguiente ronda o termina el juego
    setTimeout(() => {
      if (round >= MAX_ROUNDS) {
        setStatus("finished");  // Si ya terminó, cambia el estado a "finished"
      } else {
        setRound(prev => prev + 1); // Si no, avanza a la siguiente ronda
        fetchRandomCharacter();      // Y carga un nuevo personaje
      }
    }, 2000); // Espera 2 segundos antes de avanzar
  };

  // Función para reiniciar el juego desde cero
  const resetGame = () => {
    setScore(0);            // Resetea el puntaje
    setRound(1);            // Resetea la ronda
    setStatus("idle");      // Estado inicial
    setInputValue("");      // Limpia el input
    setCorrectName("");     // Limpia el nombre correcto
    fetchRandomCharacter(); // Carga un nuevo personaje
  };

  // Retorna todos los estados y funciones necesarias para el componente que use el hook
  return {
    character,
    inputValue,
    setInputValue,
    status,
    loading,
    score,
    round,
    correctName,
    showAnswer,
    checkGuess,
    resetGame,
    MAX_ROUNDS,
  };
}
