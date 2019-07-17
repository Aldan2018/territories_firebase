import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSaveService {

  constructor() { }

  createJSON(territory):void {
    let terrJSON = JSON.stringify(territory);
    this.saveInLocalStorage(terrJSON, false);
  }

  createAppJSON(index):void {
    let indexJSON = JSON.stringify(index);
    this.saveInLocalStorage(false, indexJSON);
  }

  saveInLocalStorage(terrJSON, indexJSON):void {
    if (indexJSON === false) {
      localStorage.setItem('data', terrJSON);
    } else {
      localStorage.setItem('index', indexJSON);
    }
  }

}
