export interface Promotion {
    nombre: string;
    descripcion: string;
    porcentaje: number;
    dias: string[];
    fechas: string[];
    horarios: string[];
    funciones: string[];
    imagenUrl: string | null;
    promotionCode: string;
  }