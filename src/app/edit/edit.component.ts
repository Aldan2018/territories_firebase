import { Component, ViewChild } from '@angular/core';
import { Location }                            from '@angular/common';
import { ModalController }                     from '@ionic/angular';

import { DataManagementService }               from '../data-management.service';
import { ModalAddInfoPage }                    from '../modal-add-info/modal-add-info.page';
import { Subscription } from 'rxjs';
import { IUser } from '../services/auth.service';
import { LoginLogoutService } from '../services/login-logout.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  description:string;
  info:string;
  converter:boolean;
  appartNum: string;
  subscribtions$: Subscription[] = [];
  currentUser: IUser;

  @ViewChild('slidingList') slidingList;

  constructor(private location: Location,
              public data: DataManagementService,
              private isUser: LoginLogoutService,
              public modalController: ModalController) { 
                this.subscribtions$[0] = this.isUser.currentUser$.subscribe(res => {
                  this.currentUser = res;
                })
                this.data.getTerrotories(this.currentUser);
                this.showInfo();
              }

  showInfo() {
    let terr = this.data.territory[this.data.terrIndex].appartaments;
    let merged = [].concat.apply([], terr);
    this.info = merged[this.data.appIndex].description;
    this.appartNum = merged[this.data.appIndex].num;
    if (this.info) {
      this.converter = true;
  }
}

  getInfo(description):void {
    let date = this.data.getDate();
    this.data.addInfoAboutAppart(date, description);
    this.showInfo();
  }

  async presentModalAddInfo() {
    const modalInfo = await this.modalController.create({component: ModalAddInfoPage,
                                                          cssClass: 'modalAddInfo'});
    return await modalInfo.present();
  }

  async delete() {
    await this.slidingList.closeSlidingItems();
  }

}
