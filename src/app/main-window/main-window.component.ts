import { Component, OnInit, ViewChild }           from '@angular/core';
import { Router }                                 from '@angular/router';
import { ModalController }                        from '@ionic/angular';

import { DataManagementService }                  from '../data-management.service';

import { ModalAddTerrPage }                       from '../modal-add-terr/modal-add-terr.page';
import { ModalLoginPage }                         from '../modals/modal-login/modal-login.page';



@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit {

  dropConv: boolean = false;                         //переменная для скрытия/показа кнопок сортировки

  title: string = 'Групповые участки собрания';

  @ViewChild('slidingList') slidingList;            //обходной путь, чтобы повторное удаление происходило без перезагрузки
                                                    // (https://github.com/ionic-team/ionic/issues/15486#issuecomment-420025772)


  constructor(public data:DataManagementService,
              private _rout: Router,
              public modalController: ModalController) {  }

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

}
