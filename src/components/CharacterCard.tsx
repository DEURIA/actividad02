
import type { RMCharacter } from "../usuariosLogin/interfaces/rickmorty.interface";//importo la interfaz del personaje 

//este componente es para mostrar la informacion de cada personaje
export default function CharacterCard({ ch }: { ch: RMCharacter }) {
  return (
    <article style={styles.card}>
      <img src={ch.image} alt={ch.name} style={styles.image} />
      <div style={styles.body}>
        <h3 style={{ margin: 0 }}>{ch.name}</h3>
        <p style={styles.meta}><b>Estado:</b> {ch.status}</p>
        <p style={styles.meta}><b>Especie:</b> {ch.species}</p>
        <p style={styles.meta}><b>Género:</b> {ch.gender}</p>
        <p style={styles.meta}><b>Origen:</b> {ch.origin?.name}</p>
        <p style={styles.meta}><b>Ubicación:</b> {ch.location?.name}</p>
      </div>
    </article>
  );
}

//Estilos basicos para que se vea como una tarjeta
const styles: Record<string, React.CSSProperties> = {
  card: { background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,.06)", display: "flex", flexDirection: "column" },
  image: { width: "100%", height: 220, objectFit: "cover" },
  body: { padding: 12 },
  meta: { margin: "4px 0", fontSize: 13, color: "#444" },
};
//esto sirbe para mostrar la informacion de cada personaje
//recibe un objeto ch de tipo RMCharacter por props
//muestra la imagen, nombre, estado, especie, genero, origen y ubicacion del personaje
//aplica estilos basicos para que se vea como una tarjeta
