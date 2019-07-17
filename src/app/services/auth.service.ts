import { Injectable } from '@angular/core';
import { People, Group, Congregation }     from '../classes/people';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  publisher: People;
  group: Group;
  congregation: Congregation;

  constructor() { }

  createUser(user) {
    console.log(user);
    // this.firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .catch(function(error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //   });
  }

}
