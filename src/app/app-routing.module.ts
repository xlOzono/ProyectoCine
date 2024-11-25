import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePromotionsComponent } from './components/create-promotions/create-promotions.component';
import { PromotionsComponent } from './components/promotions/promotions.component';

const routes: Routes = [
  { path: 'add-promotions', component: CreatePromotionsComponent},
  { path: '', component: PromotionsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
