
//Este hook encapsula toda la logica estado,fetch con avios, paginacion y busqueda, con diferentes estados y efectos

import { useEffect, useState } from "react";
import { fetchCharacters } from "../api/rmApi";
import type { RMCharacter } from "../usuariosLogin/interfaces/rickmorty.interface";

export function useCharacters() {
  const [characters, setCharacters] = useState<RMCharacter[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setNameFilter] = useState("");   // filtro que dispara fetch
  const [inputValue, setInputValue] = useState("");   // control del input
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const data = await fetchCharacters(page, nameFilter, controller.signal);
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err: any) {
        if (err?.name === "CanceledError") return;
        setCharacters([]);
        setTotalPages(1);
        setErrorMsg(
          err?.message === "NO_RESULTS"
            ? "No se encontraron personajes con ese criterio."
            : "Ocurrió un error al cargar los personajes."
        );
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [page, nameFilter]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setNameFilter(inputValue);
  };

  const nextPage = () => page < totalPages && setPage(p => p + 1);
  const prevPage = () => page > 1 && setPage(p => p - 1);

  return {
    characters,
    page, totalPages,
    nameFilter, setNameFilter,
    inputValue, setInputValue,
    loading, errorMsg,
    onSearchSubmit,
    nextPage, prevPage,
  };
}

