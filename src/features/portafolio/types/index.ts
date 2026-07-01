export const CATEGORIAS = [
  "Todos",
  "Desarrollo de Software",
  "Desarrollo Web",
  "Infraestructura",
  "Producto Digital",
] as const;

export type Categoria = (typeof CATEGORIAS)[number];

export interface Proyecto {
  id: string;
  slug: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  fecha: string;
  imagen: string;
  href?: string;
}
