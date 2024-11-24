import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Buy } from '../_models/buy';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  // BehaviorSubject para gestionar compras del usuario
  private purchasesSubject = new BehaviorSubject<Buy[]>([]);
  public purchases$: Observable<Buy[]> = this.purchasesSubject.asObservable();

  constructor(private accountService: AccountService) {
    // Inicializa las compras con las del usuario actual
    const user = this.accountService.userValue;
    if (user) {
      this.purchasesSubject.next(user.listBuys);
    }
  }

  // Obtener compras actuales
  getPurchases(): Buy[] {
    return this.purchasesSubject.value;
  }

  // Agregar una nueva compra
  addPurchase(newPurchase: Buy): void {
    const currentPurchases = this.purchasesSubject.value;
    currentPurchases.push(newPurchase);

    // Actualizar el BehaviorSubject
    this.purchasesSubject.next(currentPurchases);

    // Actualizar el usuario actual en AccountService
    const user = this.accountService.userValue;
    if (user) {
      user.listBuys = currentPurchases;
      this.accountService.updateUser(user); // Sincroniza con el almacenamiento local
    }
  }

  // Actualizar una compra existente
  updatePurchase(index: number, updatedPurchase: Buy): void {
    const currentPurchases = this.purchasesSubject.value;
    if (index >= 0 && index < currentPurchases.length) {
      currentPurchases[index] = updatedPurchase;

      // Actualizar el BehaviorSubject
      this.purchasesSubject.next(currentPurchases);

      // Actualizar el usuario actual en AccountService
      const user = this.accountService.userValue;
      if (user) {
        user.listBuys = currentPurchases;
        this.accountService.updateUser(user);
      }
    }
  }

  // Eliminar una compra
  deletePurchase(index: number): void {
    const currentPurchases = this.purchasesSubject.value;
    if (index >= 0 && index < currentPurchases.length) {
      currentPurchases.splice(index, 1); // Elimina la compra del array

      // Actualizar el BehaviorSubject
      this.purchasesSubject.next(currentPurchases);

      // Actualizar el usuario actual en AccountService
      const user = this.accountService.userValue;
      if (user) {
        user.listBuys = currentPurchases;
        this.accountService.updateUser(user);
      }
    }
  }
}
