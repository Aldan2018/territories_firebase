import { Component }          from '@angular/core';
import { ModalController }    from '@ionic/angular';
import { ModalRegisterPage }  from '../modal-register/modal-register.page';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage {

  constructor(public modalController: ModalController) { }

  async addModalRegister() {
    const modal = await this.modalController.create({component: ModalRegisterPage,
                                                      cssClass: 'ModalRegister'});
    return await modal.present();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}