import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, from } from 'rxjs';
import { IUser } from './auth.service';
import { LoginLogoutService } from './login-logout.service';
import { TemporaryDataOfTerritoriesService } from './temporary-data-of-territories.service';

@Injectable({
  providedIn: 'root'
})

export class fireDatabaseService {
  user: IUser;

  constructor(private isUser: LoginLogoutService,
              private tempTerr: TemporaryDataOfTerritoriesService) {
    this.isUser.currentUser$.subscribe(res => {this.user = res});
   }
  
  saveTerr(terr, userUid?):Observable<any> {
    if(userUid) {
      return from(firebase.database().ref('terr/' + userUid + '/' + terr.terrId).set( terr ))
    } else {
      return from(firebase.database().ref('terr/' + this.user.uid + '/' + terr.terrId).set( terr ))
    }
  }

  updateTerr(isUpdate) {
    return firebase.database().ref().update(isUpdate);
  }

  removeTerr(terr, userUid?):Observable<any> {
    if (userUid) {
      return from(firebase.database().ref('terr/' + userUid + '/' + terr.terrId).set( null ))
    } else {
      return from(firebase.database().ref('terr/' + this.user.uid + '/' + terr.terrId).set( null ))
    }
  }

  getTerr(currentUser, currentTerrId?):Observable<any> {
    if (currentTerrId) {
      return from(firebase.database().ref('terr/' + currentUser + '/' + currentTerrId).once('value'))
    } else {
      return from(firebase.database().ref('terr/' + currentUser.uid).once('value'))
    }
  }

  movingTerr(ownUser, currentUser, currentTerrId) {
    this.getTerr(currentUser.uid, currentTerrId).subscribe(res => {
      let movedTerr = res.val();
      this.saveTerr(movedTerr, ownUser.uid);
      if(ownUser.isAdmin || !currentUser.isAdmin) {
        this.removeTerr(movedTerr, currentUser.uid);
      }
      // this.followChangesDatabase(movedTerr, ownUser);
    })
  }

  // followChangesDatabase(terr, user) {
  //   firebase.database().ref('terr/' + user.uid + '/' + terr.terrId).on('value', (snapshot) => {
  //     this.tempTerr.tempTerr.push(snapshot.val());
  //     console.log(this.tempTerr.tempTerr);
  //   })
  // }

  saveUser(user) {
    var regUser = firebase.auth().currentUser;
    var newUser: IUser = {
      displayName: user.name + ' ' + user.surname,
      isAdmin: false,
      uid: regUser.uid
    }
    firebase.database().ref('users/' + newUser.uid).set(newUser);
  }

  updateUser(users) {
    users.forEach(i => {
      firebase.database().ref('users/' + i.uid).set(i);
    })
  }

  getUser(path?):Observable<any> {
    if (path) {
      return from(firebase.database().ref('users/' + path).once('value'));
    } else {
      return from(firebase.database().ref('users/').once('value'));
    }
  }
}