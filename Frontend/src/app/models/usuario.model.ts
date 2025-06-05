export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  password?: string;
  recetasFavoritas?: string[];
  recetasCreadas?: string[];
}
