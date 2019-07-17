import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { DetailComponent }        from './detail/detail.component';
import { EditComponent }          from './edit/edit.component';
import { MainWindowComponent }    from './main-window/main-window.component';

const routes: Routes = [
  { path: 'detail/:terr.name',  component: DetailComponent },
  { path: 'edit',               component: EditComponent },
  { path: 'main',               component: MainWindowComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'modal-add-terr',       loadChildren: './modal-add-terr/modal-add-terr.module#ModalAddTerrPageModule' },
  { path: 'modal-add-appart',     loadChildren: './modal-add-appart/modal-add-appart.module#ModalAddAppartPageModule' },
  { path: 'modal-sort-appart',    loadChildren: './modal-sort-appart/modal-sort-appart.module#ModalSortAppartPageModule' },
  { path: 'modal-add-info',       loadChildren: './modal-add-info/modal-add-info.module#ModalAddInfoPageModule' },
  { path: 'modal-login',          loadChildren: './modals/modal-login/modal-login.module#ModalLoginPageModule' },
  { path: 'modal-register', loadChildren: './modals/modal-register/modal-register.module#ModalRegisterPageModule' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
