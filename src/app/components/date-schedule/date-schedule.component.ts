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

  toggleDateSelector(): void {
    if (this.showDateSelector) {
      this.buttonTextFecha = "AGREGAR";
    } else {
      this.buttonTextFecha = "QUITAR";
    }
    this.showDateSelector = !this.showDateSelector;
    if (!this.showDateSelector) {
      this.fechas = [];
      this.date = '';
      this.mostrarBotonFecha = false;
      this.confirmFechas();
    }
    else {
      this.mostrarBotonFecha = true;
    }
  }

  addFecha() {
    if (this.fechas.length < 2) {
      if (this.fechas.length === 0) {
        this.fechas.push(this.date);
      } else {
        const primeraFecha = new Date(this.fechas[0]);
        const segundaFecha = new Date(this.date);
        if (segundaFecha > primeraFecha) {
          this.fechas.push(this.date);
        } else {
          alert("La segunda fecha debe ser posterior a la primera.");
        }
      }
      
      this.date = '';
      this.mostrarBotonFecha = this.fechas.length > 0;
    }
  }

  removeFecha(index: number) {
    this.fechas.splice(index, 1);  
  }

  
  toggleTimeSelector() {
    if (this.showTimeSelector) {
      this.buttonTextHora = "AGREGAR";
    } else {
      this.buttonTextHora = "QUITAR";
      this.mostrarBotonHora = true; 
    }
    this.showTimeSelector = !this.showTimeSelector;
  
    if (!this.showTimeSelector) {
      this.horarios = [];
      this.hora = '';
      this.mostrarBotonHora = false; 
      this.confirmHorarios();
    }
  }

  addHora() {
    if (this.horarios.length < 2) {
      if (this.horarios.length === 0) {
        
        this.horarios.push(this.hora);
      } else {
        
        const primeraHora = new Date(`1970-01-01T${this.horarios[0]}:00`);
        const segundaHora = new Date(`1970-01-01T${this.hora}:00`);

        
        if (segundaHora > primeraHora) {
          this.horarios.push(this.hora);
        } else {
          alert("La segunda hora debe ser posterior a la primera.");
        }
      }
      
      this.hora = '';
      this.mostrarBotonHora = this.horarios.length > 0;
    }
  }

  removeHora(index: number) {
    this.horarios.splice(index, 1);
  }
}
