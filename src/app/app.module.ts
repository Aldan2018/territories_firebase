import { NgModule }                            from '@angular/core';
import { BrowserModule }                       from '@angular/platform-browser';
import { RouteReuseStrategy }                  from '@angular/router';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms'; // <-- NgModel lives her
import { HttpClientModule }                    from '@angular/common/http';

import { IonicModule, IonicRouteStrategy }     from '@ionic/angular';
import { SplashScreen }                        from '@ionic-native/splash-screen/ngx';
import { StatusBar }                           from '@ionic-native/status-bar/ngx';

import { AngularFireModule }                   from '@angular/fire';
import { AngularFirestoreModule }              from '@angular/fire/firestore';
import { AngularFireAuthModule }               from '@angular/fire/auth';
import { environment }                         from '../environments/environment';

import { AppComponent }                        from './app.component';
import { AppRoutingModule }                    from './app-routing.module';
import { MainWindowComponent }                 from './main-window/main-window.component';
import { DetailComponent }                     from './detail/detail.component';
import { EditComponent }                       from './edit/edit.component';

import { ModalAddTerrPage }                    from './modal-add-terr/modal-add-terr.page';
import { ModalAddAppartPage }                  from './modal-add-appart/modal-add-appart.page';
import { ModalSortAppartPage }                 from './modal-sort-appart/modal-sort-appart.page';
import { ModalAddInfoPage }                    from './modal-add-info/modal-add-info.page';
import { ModalLoginPage }                      from './modals/modal-login/modal-login.page';
import { ModalRegisterPage }                   from './modals/modal-register/modal-register.page'

import { DataManagementService }               from './data-management.service';
import { DataSaveService }                     from './data-save.service';

@NgModule({
  declarations: [
    AppComponent,
    MainWindowComponent,
    DetailComponent,
    EditComponent,
    ModalAddTerrPage,
    ModalAddAppartPage,
    ModalAddInfoPage,
    ModalSortAppartPage,
    ModalLoginPage,
    ModalRegisterPage
  ],
  entryComponents: [ModalAddTerrPage,
                    ModalAddAppartPage,
                    ModalSortAppartPage,
                    ModalAddInfoPage,
                    ModalLoginPage,
                    ModalRegisterPage],
  imports: [BrowserModule,
            HttpClientModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            FormsModule,
            ReactiveFormsModule,
            AngularFireModule.initializeApp(environment.firebase),
            AngularFirestoreModule, // imports firebase/firestore, only needed for database features
            AngularFireAuthModule, // imports firebase/auth, only needed for auth features
          ],
  providers: [
    DataManagementService,
    DataSaveService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
