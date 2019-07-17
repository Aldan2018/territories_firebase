import { Injectable }       from '@angular/core';
import { Terr }             from './territories';
import { TERRLIST }         from './mock-territories';
import { Observable, of }   from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesCongService {

  constructor() { }

  // getTerrotories(): Observable<Terr[]> {
  // return of(TERRLIST);
  // }

  getTerrotories()/*: Observable<Terr[]> */{
    let BASETERR = localStorage.getItem('data');
    let BASEINDEX = localStorage.getItem('index');
    BASETERR = JSON.parse(BASETERR);
    BASEINDEX = JSON.parse(BASEINDEX);
    if (BASETERR === null) {
      let BASETERR = TERRLIST;
      return {BASETERR};
    };
    return {BASETERR, BASEINDEX};
  }

}
