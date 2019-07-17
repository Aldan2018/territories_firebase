import { Component, OnInit }          from '@angular/core';
import { ModalController }            from '@ionic/angular';
import { Router }                     from '@angular/router';

import { DataManagementService }      from '../data-management.service';

@Component({
  selector: 'app-modal-add-info',
  templateUrl: './modal-add-info.page.html',
  styleUrls: ['./modal-add-info.page.scss'],
})
export class ModalAddInfoPage implements OnInit {

  constructor(public modalController: ModalController,
              private data: DataManagementService,
              private _rout: Router) { }

  ngOnInit() {
  }

  getBgrnd(e) {
    let elem = e.currentTarget.children[0];
    let bgrnd = window.getComputedStyle(elem).backgroundColor;
    this.data.addColorOfAppart(bgrnd);

    let answer = e.currentTarget.children[1].textContent;
    if (answer == 'Повторное посещение') {
      this._rout.navigate(['/edit'])
    } else if (answer == 'Категорический отказ') {
      this._rout.navigate(['/edit'])
    } else {
      this.modalController.dismiss();
    }

    this.modalController.dismiss();
  }

}
