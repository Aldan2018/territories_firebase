import { Component }          from '@angular/core';
import { ModalController }    from '@ionic/angular';
import { ModalRegisterPage }  from '../modal-register/modal-register.page';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginLogoutService } from 'src/app/services/login-logout.service';
import { fireDatabaseService } from 'src/app/services/fire-database.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.page.html',
  styleUrls: ['./modal-login.page.scss'],
})
export class ModalLoginPage {

  private login: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Это поле обязательно' }
    ],
    'password': [
      // { type: 'required', message: 'Это поле обязательно' },
      // { type: 'minlength', message: 'Минимальная длина пароля 6 символов' },
      // { type: 'pattern', message: 'Ваш пароль должен содержать цифры и буквы' }
    ]
  };

  constructor(public modalController: ModalController,
              private formBuilder: FormBuilder,
              private isUser: LoginLogoutService,
              private fireDatabase: fireDatabaseService,
              public auth: AuthService) { 
                this.login = this.formBuilder.group({
                  eMail: ['', Validators.required],
                  password: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
                  ])]
                });
               };

  async addModalRegister() {
    const modal = await this.modalController.create({component: ModalRegisterPage,
                                                      cssClass: 'ModalRegister'});
    return await modal.present();
  };

  getLogin() {
    this.auth.loginAccaunt(this.login.value).subscribe(res => {
      this.fireDatabase.getUser(res.user.uid).subscribe(res => {
        this.isUser.currentUser$.next(res.val());
      })
    },
    (err) => {
      console.log(err)
    })
  };

  closeModal() {
    this.modalController.dismiss();
  };
}