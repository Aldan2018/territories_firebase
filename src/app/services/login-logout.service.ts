import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginLogoutService {
    // constructor() { }
    public isUserLogin: Subject<boolean> = new Subject<boolean>();
    isUserTrue() {
      this.isUserLogin.next(true);
    };
    isUserFalse() {
      this.isUserLogin.next(false);
    };
    getIsUser(): Observable<any> {
      return this.isUserLogin.asObservable();
  };
}
