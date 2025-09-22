//Servicios axios para la api de rick y morty

import axios from "axios";
import type { RMCharactersResponse } from "../usuariosLogin/interfaces/rickmorty.interface";

const rmApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  timeout: 10000, // tiempo máximo 10s antes de abortar
});


/**
 * Obtiene personajes con paginación y filtro por nombre.
 * La API devuelve 404 cuando no hay resultados -> mapeamos a error controlado.
 */
// 1) Creamos una instancia de axios con configuración base
export async function fetchCharacters(page = 1, name = "", signal?: AbortSignal): Promise<RMCharactersResponse> {
  try {
    // 2) Hacemos la petición GET usando la instancia rmApi y tipamos la respuesta con RMCharacterResponse para el autocompletado y seguridad
    const { data } = await rmApi.get<RMCharactersResponse>("/character", {
      params: { page, ...(name.trim() ? { name: name.trim() } : {}) },
      signal,
    });
    // 3) Devolvemos el body parseado por axios (ya tipado)
    return data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      if (err.name === "CanceledError") throw err;//si es cancelado
      if (err.response?.status === 404) throw new Error("NO_RESULTS");//no hay resultado
    }
    throw new Error(err?.message || "REQUEST_FAILED");//cualquier otro
  }
}
//Este archivo es para hacer las peticiones a la api de rick and morty