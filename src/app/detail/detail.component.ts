import { Component, OnInit, Input } from '@angular/core';
import { Terr }                     from '../territories';
import { Location }                 from '@angular/common';
import { Router }                   from '@angular/router';
import { DataManagementService }    from '../data-management.service';
import { DataSaveService }          from '../data-save.service';

import * as $                       from 'jquery';
import { ModalController }          from '@ionic/angular';
import { ModalAddAppartPage }       from '../modal-add-appart/modal-add-appart.page';
import { ModalSortAppartPage }      from '../modal-sort-appart/modal-sort-appart.page';
import { ModalAddInfoPage }         from '../modal-add-info/modal-add-info.page';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  arrID;
  checked: boolean = false;
  converter: boolean;
  showDelButton: boolean = false;
  terDetaiNameEdit:boolean = false;
  terDetaiOwnEdit:boolean = false;

  constructor(public modalController: ModalController,
              private location: Location,
              private data: DataManagementService,
              private dataSave: DataSaveService,
              private _rout: Router) { }

  ngOnInit() {this.data.getTerrotories()}

//переход к описанию квартиры
  folloving(indicator):void {
    //получение индекса квартиры
    let merged = [].concat.apply([], this.data.territory[this.data.terrIndex].appartaments);
    this.data.appIndex = merged.findIndex(i => i.num == indicator);
    this.data.getIndex();
  //проверка, включен ли чекбокс
    if (this.checked == true) {
      return;
    }
    // проверка, есть ли записи о квартире
    if (merged[this.data.appIndex].description !== undefined) {
      this._rout.navigate(['/edit']);
      return;
    }
    this.presentModalAddInfo();
  }

// Переключение названий кнопок и активация/деактивация кнопки "Удалить"
  showChecked() {
    (this.checked == false) ? (this.checked = true) : (this.checked = false);
    if (this.showDelButton == true) {
      this.showDelButton = false;
    }
    this.arrID = [];
  }

  getDelIndex(id) {
    let merged = [].concat.apply([], this.data.territory[this.data.terrIndex].appartaments); //объединение квартир по этажам в один массив
    let indexApp = merged.findIndex(i => i.num == +id); //получение индекса квартыры в общем массиве квартир подъезда
//проверка, есть ли уже эта квартира среди выбранных
    let verificationIndex = this.arrID.indexOf(indexApp);
    if (verificationIndex !== -1) {
      this.arrID.splice(verificationIndex, 1)
    } else {
      this.arrID.push(indexApp);
    };
  // включение/выключение кнопки "Удалить"
    if (this.arrID.length > 0) {
      this.showDelButton = true
    }  else {
      this.showDelButton = false
    }
  }

  async presentModalAdd() {
    const modalAdd = await this.modalController.create({component: ModalAddAppartPage,
                                                        cssClass: 'modalAddAppart'});
    return await modalAdd.present();
  }

  async presentModalSort() {
    const modalSort = await this.modalController.create({component: ModalSortAppartPage,
                                                          cssClass: 'modalSortAppart'});
    return await modalSort.present();
  }

  async presentModalAddInfo() {
    const modalInfo = await this.modalController.create({component: ModalAddInfoPage,
                                                          cssClass: 'modalAddInfo'});
    return await modalInfo.present();
  }

}
