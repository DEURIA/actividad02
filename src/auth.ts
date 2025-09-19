import { mockDatos } from "./usuariosLogin/mock-data/login.mock";


const STORAGE_KEY = "loggedUser";




//**Todo esto es la logica de autenticacion basada en mi mock ficticio ya que no tengo base de datos y asi se pide en la tarea */
//esto es para simular un login, guardando en localStorage el usuario logueado
// Devuelve true si el login es exitoso, false si no

export function signIn(email: string, password: string): boolean {
  const e = email.trim().toLowerCase();
  const p = password.trim();

  // valida campos vacíos
  if (!e || !p) return false;

  // compara contra tu mock (case-insensitive para email)
  const ok = mockDatos.some(u => u.email.toLowerCase() === e && u.password === p);
  if (ok) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: e }));
    return true;
  }
  return false;
}



// En la práctica uso mock local. Si luego tengo backend, cambiaria esto pero por ahora como es un ejercicio...
// Aquí sólo valido contra tu mock en memoria:


export function getCurrentUser(): { email: string } | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}


/** Cierra sesión */
export function signOut(): void {
  localStorage.removeItem(STORAGE_KEY);
}
