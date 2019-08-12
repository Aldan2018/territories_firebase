import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, AsyncSubject } from 'rxjs';
import { IUser } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {

    constructor () { }

    // currentUser: IUser;
    // currentUser$: BehaviorSubject<IUser> = new BehaviorSubject(null);
    currentUser$: Subject<IUser> = new Subject<IUser>();
    
  //   isUserTrue() {
  //     this.isUserLogin.next(true);
  //   };
  //   isUserFalse() {
  //     this.isUserLogin.next(false);
  //   };
  //   getIsUser(): Observable<any> {
  //     return this.isUserLogin.asObservable();
  // };
}
