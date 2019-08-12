import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }                  from '@angular/router';
import { ModalController }                         from '@ionic/angular';

import { DataManagementService }                   from '../data-management.service';

import { ModalAddTerrPage }                        from '../modal-add-terr/modal-add-terr.page';
import { ModalLoginPage }                          from '../modals/modal-login/modal-login.page';
import { AuthService, IUser }               from '../services/auth.service';
import { Subscription }                from 'rxjs';
import { LoginLogoutService }                      from '../services/login-logout.service'
import { fireDatabaseService }                     from '../services/fire-database.service';
import { messageService } from '../services/message.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnDestroy {

  dropConv: boolean = false;                         //переменная для скрытия/показа кнопок сортировки
  subscribtions$: Subscription[] = [];
  currentUser: IUser;
  // currentUserId: string;
  title: string = 'Групповые участки собрания';
  // isUserLogin: boolean;

  @ViewChild('slidingList') slidingList;            //обходной путь, чтобы повторное удаление происходило без перезагрузки
                                                    // (https://github.com/ionic-team/ionic/issues/15486#issuecomment-420025772)

  constructor(public data:DataManagementService,
              private _rout: Router,
              private route: ActivatedRoute,
              public modalController: ModalController,
              public auth: AuthService,
              private isUser: LoginLogoutService,
              private fireDatabase: fireDatabaseService,
              private message: messageService
              ) {
                this.auth.whoIsUser();
                this.subscribtions$[0] = this.isUser.currentUser$.subscribe(res => {
                  if(res && res.displayName != 'not') {
                    this.currentUser = res;
                    this.data.getTerrotories(this.currentUser);
                    this.data.currentUser = this.currentUser;
                  } else {
                    this.currentUser = null;
                  }
                });
              };

  folloving(indicator):void {
    // получение индекса выбранного элемента из массива участков
    this.data.terrIndex = indicator;
    this.data.getIndex()

    this._rout.navigate(['/detail/{{terr.name}}']);
  }

  async delete() {
    await this.slidingList.closeSlidingItems();
  }

  async presentModalAdd() {
    const modal = await this.modalController.create({component: ModalAddTerrPage,
                                                      cssClass: 'modalAddTerr'});
    return await modal.present();
  }
  async presentModalLogin() {
    const modal = await this.modalController.create({component: ModalLoginPage,
                                                      cssClass: 'modalLogin'});
    return await modal.present();
  }
  presentModalLogout() {
    this.message.presentAlertLogout('Выйти?', this.auth.logoutAccaunt, this.auth)
  }
  goToAdminPanel() {
    this._rout.navigate(['admin']);
  }

  storageClear() {
    // localStorage.clear();
    // this.fireDatabase.followChangesDatabase()
    // .subscribe(snapshot => {
    //   console.log('Ответ базы данный Файрбэйс', snapshot.val());
    // });
  }

  ngOnDestroy() {
    this.subscribtions$.forEach(subscription => subscription.unsubscribe());
  }

}
