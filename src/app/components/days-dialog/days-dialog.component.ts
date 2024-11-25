import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dias-dialog',
  templateUrl: './days-dialog.component.html',
  styleUrls: ['./days-dialog.component.css']
})
export class DaysDialogComponent {
  @Input() show: boolean = false;
  @Input() diasDisponibles: string[] = [];
  @Input() diasSeleccionados: string[] = [];
  @Output() closeModal = new EventEmitter<void>();
  @Output() diasConfirmados = new EventEmitter<string[]>();

  diasSeleccionadosTemp: string[] = [];

  ngOnChanges() {
    if (this.show) {
      this.diasSeleccionadosTemp = [...this.diasSeleccionados]; 
    }
  }

  toggleDiaSelection(dia: string) {
    const index = this.diasSeleccionadosTemp.indexOf(dia);
    if (index > -1) {
      this.diasSeleccionadosTemp.splice(index, 1);
    } else {
      this.diasSeleccionadosTemp.push(dia);
    }
  }

  confirmSelection() {
    this.diasConfirmados.emit([...this.diasSeleccionadosTemp]); 
    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
