import { Injectable }       from '@angular/core';
import { TERRLIST }         from './mock-territories';
import { Observable, of }   from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesCongService {

  getTerrotories(): Observable<any>{
    let BASETERR = localStorage.getItem('data');
    let BASEINDEX = localStorage.getItem('index');
    BASETERR = JSON.parse(BASETERR);
    BASEINDEX = JSON.parse(BASEINDEX);
    if (BASETERR === null) {
      let BASETERR = TERRLIST;
      return of(BASETERR);
    };
    return of({BASETERR, BASEINDEX});
  }

}
