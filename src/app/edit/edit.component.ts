import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Location }                            from '@angular/common';
import { ModalController }                     from '@ionic/angular';

import { DataManagementService }               from '../data-management.service';
import { ModalAddInfoPage }                    from '../modal-add-info/modal-add-info.page';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  description:string;
  info:string;
  converter:boolean;
  appartNum: string;

  @ViewChild('slidingList') slidingList;

  constructor(private location: Location,
              public data: DataManagementService,
              public modalController: ModalController) { }


  ngOnInit() { this.data.getTerrotories(), this.showInfo()  }

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
