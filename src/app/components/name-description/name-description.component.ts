import { Component } from '@angular/core';
import { PromAdminService } from 'src/app/services/prom-admin.service';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';


@Component({
  selector: 'app-name-description',
  templateUrl: './name-description.component.html',
  styleUrls: ['./name-description.component.css']
})
export class NameDescriptionComponent {
  constructor(public promAdminService: PromAdminService){}

  name:string = '';
  desc:string = '';

  confirmName() {
    if (!this.name.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }
    this.promAdminService.changeNombre(this.name);
  }

  confirmDesc() {
    if (!this.desc.trim()) {
      alert('La descripción no puede estar vacío');
      return;
    }
    console.log('Descripción confirmada:', this.desc);
    this.promAdminService.changeDescripcion(this.desc);
  }
}
