import { Component } from '@angular/core';
import { PromAdminService } from 'src/app/services/prom-admin.service';

@Component({
  selector: 'app-date-schedule',
  templateUrl: './date-schedule.component.html',
  styleUrls: ['./date-schedule.component.css']
})
export class DateScheduleComponent {

  constructor(public promAdminService: PromAdminService) {}

  date:string = '';
  fechas: string[] = []; 
  hora: string = '';
  horarios: string[] = [];

  buttonTextFecha: string = "AGREGAR";
  buttonTextHora: string = "AGREGAR";
  showDateSelector: boolean = false;
  showTimeSelector: boolean = false;
  mostrarBotonFecha = false;
  mostrarBotonHora = false;

  confirmFechas() {
    if (this.fechas.length == 1) {
      alert("Debe seleccionar dos fechas para confirmar (Desde y Hasta).");
      return;
    }
    this.promAdminService.changeFechas(this.fechas);
    console.log("Fechas confirmadas:", this.fechas);
  }
  
  confirmHorarios() {
    if (this.horarios.length == 1) {
      alert("Debe seleccionar dos horarios para confirmar (Desde y Hasta).");
      return;
    }
    this.promAdminService.changeHorarios(this.horarios);
    console.log("Horarios confirmados:", this.horarios);
  }

  toggleDateSelector() {

    if (this.showDateSelector) {
      this.buttonTextFecha = "AGREGAR";
    } else {
      this.buttonTextFecha = "QUITAR";
    }
    this.showDateSelector = !this.showDateSelector;
    if (!this.showDateSelector) {
      this.fechas = [];
      this.date = '';
    }
  }

  addFecha() {
    if (this.fechas.length < 2) {
      if (this.fechas.length === 0) {
        // Agregar la primera fecha sin restricción
        this.fechas.push(this.date);
      } else {
        // Comparar la segunda fecha con la primera
        const primeraFecha = new Date(this.fechas[0]);
        const segundaFecha = new Date(this.date);

        // Validar que la segunda fecha sea mayor que la primera
        if (segundaFecha > primeraFecha) {
          this.fechas.push(this.date);
        } else {
          alert("La segunda fecha debe ser posterior a la primera.");
        }
      }
      // Limpiar el campo de la fecha después de agregarla
      this.date = '';
      this.mostrarBotonFecha = this.fechas.length > 0;
    }
  }

  removeFecha(index: number) {
    this.fechas.splice(index, 1);  // Eliminar la fecha por su índice
  }

  
  toggleTimeSelector() {
    if (this.showTimeSelector) {
      this.buttonTextHora = "AGREGAR";
    } else {
      this.buttonTextHora = "QUITAR";
    }
    this.showTimeSelector = !this.showTimeSelector;
    if (!this.showTimeSelector) {
      this.horarios = [];
      this.hora = '';
    }
  }

  addHora() {
    if (this.horarios.length < 2) {
      if (this.horarios.length === 0) {
        // Agregar la primera hora sin restricción
        this.horarios.push(this.hora);
      } else {
        // Comparar la segunda hora con la primera
        const primeraHora = new Date(`1970-01-01T${this.horarios[0]}:00`);
        const segundaHora = new Date(`1970-01-01T${this.hora}:00`);

        // Validar que la segunda hora sea mayor que la primera
        if (segundaHora > primeraHora) {
          this.horarios.push(this.hora);
        } else {
          alert("La segunda hora debe ser posterior a la primera.");
        }
      }
      // Limpiar el campo de hora después de agregarla
      this.hora = '';
      this.mostrarBotonHora = this.horarios.length > 0;
    }
  }

  removeHora(index: number) {
    this.horarios.splice(index, 1);
    this.promAdminService.deleteHora(index); // Eliminar la hora del servicio
  }
}
