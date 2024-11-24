import { Component } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/services/account.service';
import { PurchaseService } from 'src/app/services/purchase.service'; // Importa el servicio de compras
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Buy } from 'src/app/_models/buy';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-perfil-de-usuario',
  templateUrl: './perfil-de-usuario.component.html',
  styleUrls: ['./perfil-de-usuario.component.css']
})
export class PerfilDeUsuarioComponent {
  currentView: string = 'compras';
  user?: User | null; // Propiedad para almacenar el usuario
  listBuys?: Buy[];
  editForm: FormGroup; // Propiedad para almacenar el formulario
  selectedCompra?: Buy; // Propiedad para almacenar la compra seleccionada
  passwordForm: FormGroup; // Propiedad para almacenar el formulario
  


  constructor(
    private formBuilder: FormBuilder,        // Inyecta el FormBuilder
    private accountService: AccountService,  // Inyecta el servicio del usuario
    private purchaseService: PurchaseService // Inyecta el servicio de compras
    
  ) {
    // Declara los formularios con sus respectivas validaciones
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    
    })
    this.passwordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
    
    // Obtener el usuario actual
    this.accountService.user.subscribe((x) => {
      this.user = x;
      if (this.user) {
        this.listBuys = this.user.listBuys; // Cargar las compras del usuario
      };
  
      // Precargar datos del usuario
      this.accountService.user.subscribe((user) => {
        if (user) {
          this.editForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
          });
        }
      });
    });
  }

  // Cambiar Vista
  changeView(view: string) {
    this.currentView = view; // Cambia la vista activa
  }

  // Almacena la compra seleccionada
  selectCompra(compra: Buy) {
    this.selectedCompra = compra;
  }

  // (Modal) Actualizar el nombre y apellido  
  onSubmit() {
    if (this.editForm.valid && this.accountService.userValue) {
      const updatedUser = {
        ...this.accountService.userValue,
        ...this.editForm.value,
      };

      this.accountService.updateUser(updatedUser); // Actualizar el usuario
      this.closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 500); // Esperar 500ms para asegurar que el cierre del modal se complete
    }
  }

  // Cierra el modal
  closeModal() {
    const modalElement = document.getElementById('editUserModal');
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide(); // Cierra el modal si la instancia existe
      } else {
        // Crear una nueva instancia si no existe
        const newModalInstance = new bootstrap.Modal(modalElement);
        newModalInstance.hide();
      }
    }
  }
  
  // (Modal) Actualizar la contraseña
  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        alert('La nueva contraseña y la confirmación no coinciden.');
        return;
      }


      // Cerrar el modal y refrescar la página
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert('Contraseña no valida.');
    }
  }

}



