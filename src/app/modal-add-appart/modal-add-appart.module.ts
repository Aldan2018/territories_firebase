import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAddAppartPage } from './modal-add-appart.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddAppartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAddAppartPage]
})
export class ModalAddAppartPageModule {}
