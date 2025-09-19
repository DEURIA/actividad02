//Servicios axios para la api de rick y morty

import axios from "axios";
import type { RMCharactersResponse } from "../usuariosLogin/interfaces/rickmorty.interface";

const rmApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 10000,
});


/**
 * Obtiene personajes con paginación y filtro por nombre.
 * La API devuelve 404 cuando no hay resultados -> mapeamos a error controlado.
 */
export async function fetchCharacters(page = 1, name = "", signal?: AbortSignal): Promise<RMCharactersResponse> {
  try {
    const { data } = await rmApi.get<RMCharactersResponse>("/character", {
      params: { page, ...(name.trim() ? { name: name.trim() } : {}) },
      signal,
    });
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.name === "CanceledError") throw err;
      if (err.response?.status === 404) throw new Error("NO_RESULTS");
    }
    throw new Error(err?.message || "REQUEST_FAILED");
  }
}
//Este archivo es para hacer las peticiones a la api de rick and morty