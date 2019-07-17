import { Component, OnInit }          from '@angular/core';
import { ModalController }            from '@ionic/angular';

import { DataManagementService }      from '../data-management.service';


@Component({
  selector: 'app-modal-sort-appart',
  templateUrl: './modal-sort-appart.page.html',
  styleUrls: ['./modal-sort-appart.page.scss'],
})
export class ModalSortAppartPage implements OnInit {

  constructor(public data: DataManagementService,
              public modalController: ModalController) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss()
  }

}
