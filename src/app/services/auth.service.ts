import { Injectable } from '@angular/core';
import { People, Group, Congregation }     from '../classes/people';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { resolve, reject } from 'q';
import { LoginLogoutService } from './login-logout.service';

export interface ICurrentUser {
  displayName: string,
  email: string,
  phoneNumber: string,
  photoURL: string,
  providerId: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  publisher: People;
  group: Group;
  congregation: Congregation;

  constructor(private firebase: FirebaseApp,
              private _route: Router,
              private isUser: LoginLogoutService) {  }

  createUser(user) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(user.eMail, user.password)
      .then(function() {
        var regUser = firebase.auth().currentUser;
        regUser.updateProfile({
          displayName: user.name + ' ' + user.surname
        }), err => reject(err)
      })
    })
  }

  loginAccaunt(user):Observable<boolean> {
    return from(new Promise<any> ((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(user.eMail, user.password);
      this.isUser.isUserTrue();
      this.whoIsUser();
    }));
  }

  logoutAccaunt():Observable<boolean> {
    return from(new Promise<any>((resolve, reject) => {
      firebase.auth().signOut();
      this.isUser.isUserFalse();
      this.whoIsUser();
    }));
  }

  whoIsUser(): Observable<any> {
    return from(new Promise<any>(resolve => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    }))
  }

}
