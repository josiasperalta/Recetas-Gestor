export interface Receta {
  id?: string;
  titulo: string;
  autor: string;
  ingredientes: string[];
  pasos: string[];
  comentarios?: string[];
  favoritos?: string[];
}
