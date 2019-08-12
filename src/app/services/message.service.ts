import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class messageService {
  
  constructor(public alertController: AlertController) { }

  async presentAlertLogout(message, handler, context) {
    const alert = await this.alertController.create({
      message: message,
      buttons: [
        {
          text: 'Нет',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Да',
          handler: () => {
            handler.call(context)
          }
        }
      ]
    });

    await alert.present();
  }

}
