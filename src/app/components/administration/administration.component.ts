import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {

  constructor(private _rout: Router) { }

  goToUserAdmin() {
    this._rout.navigate(['adminUser']);
  }  
  deleteUser() {
    
  }

}
