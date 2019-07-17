import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalAddTerrPage } from './modal-add-terr.page';

const routes: Routes = [
  {
    path: '',
    component: ModalAddTerrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalAddTerrPage]
})
export class ModalAddTerrPageModule {}
