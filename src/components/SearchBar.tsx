//import React from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function SearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Buscar por nombre (ej: Rick)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Buscar</button>
    </form>
  );
}

const styles: Record<string, React.CSSProperties> = {
  form: { display: "flex", alignItems: "center", gap: 8 },
  input: { padding: "8px 10px", borderRadius: 8, border: "1px solid #d9d9d9", outline: "none", minWidth: 240 },
  button: { padding: "8px 12px", borderRadius: 8, border: "none", background: "#1e88e5", color: "#fff", cursor: "pointer" },
};
//Este componente es una barra de busqueda con un input controlado y un boton
//Recibe el valor del input, una funcion para actualizarlo y una funcion para manejar el submit del formulario
//Al enviar el formulario se llama a la funcion onSubmit pasada por props
//El input tiene un placeholder que indica que se puede buscar por nombre