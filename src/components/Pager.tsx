import React from "react";

type Props = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function Pager({ page, totalPages, onPrev, onNext }: Props) {
  return (
    <div style={styles.controls}>
      <button onClick={onPrev} disabled={page <= 1} style={styles.btn}>
        ← Anterior
      </button>
      <span>Página {page} de {totalPages}</span>
      <button onClick={onNext} disabled={page >= totalPages} style={styles.btn}>
        Siguiente →
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  controls: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  btn: { padding: "6px 10px", borderRadius: 8, border: "1px solid #ddd", background: "white", cursor: "pointer" },
};
//Este componente es para la paginacion de los personajes
//Recibe la pagina actual, total de paginas y funciones para ir a la pagina anterior y siguiente
//Deshabilita los botones cuando no se puede avanzar o retroceder
