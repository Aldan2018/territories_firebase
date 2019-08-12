import { Injectable } from '@angular/core';
import { People, Group, Congregation }     from '../classes/people';
import { FirebaseApp } from '@angular/fire';
import * as firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { LoginLogoutService } from './login-logout.service';
import { fireDatabaseService } from './fire-database.service';

export interface IUser {
  displayName: string,
  isAdmin: boolean,
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
              private isUser: LoginLogoutService,
              private fireDatabase: fireDatabaseService) {  }

  createUser(user) {
    return from(firebase.auth().createUserWithEmailAndPassword(user.email, user.password))
  }

  addUser(user) {
    this.createUser(user).subscribe(res => {
      var regUser = firebase.auth().currentUser;
      regUser.updateProfile({
        displayName: user.name + ' ' + user.surname
      });
      let currentUser: IUser = {
        displayName: regUser.displayName,
        isAdmin: false,
        uid: res.user.uid
      };
      this.isUser.currentUser$.next(currentUser);
      this.fireDatabase.saveUser(user);
    })
  }

  loginAccaunt(user):Observable<any> {
    return from(firebase.auth().signInWithEmailAndPassword(user.eMail, user.password))
  }

  logoutAccaunt() {
    let user: IUser = {
      displayName: 'not',
      isAdmin: false,
      uid: 'not'
    };
    firebase.auth().signOut();
    this.isUser.currentUser$.next(user);
  }

  whoIsUser() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.fireDatabase.getUser(user.uid).subscribe(res => {
          this.isUser.currentUser$.next(res.val());
        })
      }
    })
  }

  deleteUser() {
    var user = firebase.auth().currentUser;

    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      // An error happened.
    });
  }

}
