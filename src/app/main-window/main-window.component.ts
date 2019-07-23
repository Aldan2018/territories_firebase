import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute }                  from '@angular/router';
import { ModalController }                         from '@ionic/angular';

import { DataManagementService }                   from '../data-management.service';

import { ModalAddTerrPage }                        from '../modal-add-terr/modal-add-terr.page';
import { ModalLoginPage }                          from '../modals/modal-login/modal-login.page';
import { AuthService, ICurrentUser }               from '../services/auth.service';
import { Subscription }                            from 'rxjs';
import { LoginLogoutService }                      from '../services/login-logout.service'



@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit, OnDestroy {

  dropConv: boolean = false;                         //переменная для скрытия/показа кнопок сортировки
  subscribtions$: Subscription[] = [];
  currentUser: ICurrentUser;
  title: string = 'Групповые участки собрания';
  isUserLogin: boolean;

  @ViewChild('slidingList') slidingList;            //обходной путь, чтобы повторное удаление происходило без перезагрузки
                                                    // (https://github.com/ionic-team/ionic/issues/15486#issuecomment-420025772)


  constructor(public data:DataManagementService,
              private _rout: Router,
              private route: ActivatedRoute,
              public modalController: ModalController,
              public auth: AuthService,
              private isUser: LoginLogoutService) {  
                this.subscribtions$[0] = this.route.params.subscribe(res => {
                  this.subscribtions$[1] = this.auth.whoIsUser().subscribe(res => {
                    this.currentUser = res.providerData[0];
                    console.log(this.currentUser);
                  });
                });
                this.subscribtions$[2] = this.isUser.getIsUser().subscribe(res => console.log(res));
              };

  ngOnInit() { this.data.getTerrotories(); }

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
  logout() {
    this.auth.logoutAccaunt().subscribe(res => { console.log(res) })
  }

  ngOnDestroy() {
    this.subscribtions$.forEach(subscription => subscription.unsubscribe());
  }

}
