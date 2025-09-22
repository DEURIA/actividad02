
//todo esto es para rick and morty api me servira para comos e veran los datos que me traiga la api

// Modela un "personaje" tal como lo devuelve la API de Rick and Morty
export interface RMCharacter {
  id: number;
  name: string;
  image: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
}
// Información de paginación que viene en la respuesta de la API
export interface RMApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
// Estructura de la respuesta cuando se pide /character
export interface RMCharactersResponse {
  info: RMApiInfo;  // Datos de paginación
  results: RMCharacter[];  // Listado de personajes en esa página
}
