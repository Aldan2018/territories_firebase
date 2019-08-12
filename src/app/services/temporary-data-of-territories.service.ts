import { Injectable } from '@angular/core';
import { Terr } from '../territories';

@Injectable({
  providedIn: 'root'
})
export class TemporaryDataOfTerritoriesService {

  tempTerr: Terr[] = [];

  constructor() { }

  

}
