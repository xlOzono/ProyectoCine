export interface Promotion {
    nombre: string;
    descripcion: string;
    porcentaje: number;
    edades: { condition: string; value: number }[];
    fechas: string[];
    horarios: string[];
    funciones: string[];
    imagenUrl: string | null;
    promotionCode: string;
  }