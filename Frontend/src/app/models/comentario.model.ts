export interface Comentario {
  id?: string;
  texto: string;
  autorId: string;
  autorNombre: string;
  fecha?: Date;
  recetaId: string;
}
