import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.page.html',
  styleUrls: ['./modal-register.page.scss'],
})
export class ModalRegisterPage {

  private user: FormGroup;

  validation_messages = {
    'name': [
      { type: 'required', message: 'Это поле обязательно' }
    ],
    'surname': [
      { type: 'required', message: 'Это поле обязательно' }
    ],
    'headName': [
      { type: 'required', message: 'Это поле обязательно' }
    ],
    'eMail': [
      { type: 'required', message: 'Это поле обязательно' },
      { type: 'pattern', message: 'Проверьте правильность ввода электронной почты' }
    ],
    'password': [
      { type: 'required', message: 'Это поле обязательно' },
      { type: 'minlength', message: 'Минимальная длина пароля 6 символов' },
      { type: 'pattern', message: 'Ваш пароль должен содержать цифры и буквы' }
    ]
  }

  constructor(private formBuilder: FormBuilder,
              public modalController: ModalController,
              public auth: AuthService) {

    this.user = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      headName: ['', Validators.required],
      eMail: ['', Validators.compose([
        Validators.required,
	      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])]
    });
   }

  getRegister() {
    this.auth.createUser(this.user.value)
  };
  closeModal() {
    this.modalController.dismiss();
  };
}
