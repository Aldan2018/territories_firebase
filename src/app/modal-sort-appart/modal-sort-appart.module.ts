import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalSortAppartPage } from './modal-sort-appart.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSortAppartPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalSortAppartPage]
})
export class ModalSortAppartPageModule {}
