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
  user?: User | null;
  listBuys?: Buy[];
  editForm: FormGroup;
  selectedCompra?: Buy; // Propiedad para almacenar la compra seleccionada
  passwordForm: FormGroup;
  


  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private purchaseService: PurchaseService // Inyecta el servicio de compras
    
  ) {
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

  // Añadir una compra simulada
  addMockPurchase() {
    const newPurchase = new Buy(
      'Cinepolis', // Cine
      'Venom', // Película
      '2024-12-26', // Fecha
      1, // Sala
      "20:00", // Hora
      ['A3', 'A5'], // Asientos
      1000, // Precio
      'Entrada 3D' // Tipo de entrada
    );

    

    // Usar el servicio de compras para añadir una nueva compra
    this.purchaseService.addPurchase(newPurchase);

    // Actualizar la lista de compras para reflejar los cambios
    this.listBuys = this.purchaseService.getPurchases();
  }

  selectCompra(compra: Buy) {
    this.selectedCompra = compra; // Almacena la compra seleccionada
  }
  
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



