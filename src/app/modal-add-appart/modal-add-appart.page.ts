import { Component, OnInit }          from '@angular/core';
import { ModalController }            from '@ionic/angular';

import { DataManagementService }      from '../data-management.service';

@Component({
  selector: 'app-modal-add-appart',
  templateUrl: './modal-add-appart.page.html',
  styleUrls: ['./modal-add-appart.page.scss'],
})
export class ModalAddAppartPage implements OnInit {

  constructor(private data: DataManagementService,
              public modalController: ModalController) { }

  ngOnInit() {
  }

  getAppartArray(firstAppartNum, lastAppartNum):void {
    this.data.getAppartArray(+firstAppartNum, +lastAppartNum);
  }

  closeModal() {
    this.modalController.dismiss()
  }

}
