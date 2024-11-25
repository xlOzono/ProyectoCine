import { showTimeFuncion } from "./showTimeFuncion";
export interface Funcion {
    showID: number;            // ID único de la función
    opcionIdioma: string;      // Idioma de la función (e.g., "Español")
    formato: string;           // Formato de la película (e.g., "2D", "IMAX")
    precio: number;            // Precio del boleto
    showDay: Date;             // Día de la función
    showTimes: string[];       // Horarios disponibles
    showSeats: showTimeFuncion [];  // Estado de los asientos
    
  } 