
//todo esto es para rick and morty api me servira para comos e veran los datos que me traiga la api

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

export interface RMApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RMCharactersResponse {
  info: RMApiInfo;
  results: RMCharacter[];
}
