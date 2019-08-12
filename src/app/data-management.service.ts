import { Injectable }                     from '@angular/core';
import * as _                             from "lodash";
import { Terr, Appart, Descr, Indexes }   from './territories';
import { TerritoriesCongService }         from './territories-cong.service';
import { DataSaveService }                from './data-save.service';
import { fireDatabaseService }            from './services/fire-database.service';
// import { Observable, of } from 'rxjs';
import { IUser } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataManagementService {

  territory;
  terrIndex:number;
  appIndex:number;
  newTerr:Terr;
  index:Indexes;
  dataBase;
  isCheckedRefreshDatabase: boolean;
  currentUser: IUser;

  newAppartArray:Appart[];
  newDescript: Descr[];

  constructor(private terCongServ: TerritoriesCongService,
              private dataSave: DataSaveService,
              private fireDatabase: fireDatabaseService) { }

  // sorting
  sortingByAdres() {
    this.territory = _.sortBy(this.territory, ['name', 'own']);
    this.pushNewTerr(this.territory[this.terrIndex]);
  }

  sortingByPct() {
    this.territory = _.sortBy(this.territory, ['pct', 'own']);
    this.pushNewTerr(this.territory[this.terrIndex]);
  }
  // territory

  getIndex():void {
    this.index = new Indexes;
    this.index.terrIndex = +this.terrIndex;
    this.index.appIndex = +this.appIndex;
    this.dataSave.createAppJSON(this.index);
  }

  getTerrotories(currentUser) {
    this.dataBase = this.terCongServ.getTerrotories().subscribe(res => {
      if(res.BASEINDEX) {
        // this.territory = res.BASETERR;
        this.terrIndex = res.BASEINDEX.terrIndex;
        this.appIndex = res.BASEINDEX.appIndex;
        }
    });
    this.fireDatabase.getTerr(currentUser).subscribe(res => {
      let terr = res.val();
      let terrArray = [];
      for (var key in terr) {
        terrArray.push(terr[key])
      }
      this.territory = terrArray;
      // if(this.isCheckedRefreshDatabase == undefined) {
        // this.territory.forEach(i => this.fireDatabase.followChangesDatabase(i));
        // this.isCheckedRefreshDatabase = true;
      // }
    })
  }

  createNewTerr(newTerrName):void {
    let terrId:any = Date.now();
    /*
    // проверка на наличие участка с таким-же именем
    */
    if (this.territory.length !== 0) {
    let isThisName = this.territory.some(i => i.name == newTerrName);
      if (!isThisName) {
      this.newTerr = new Terr(terrId, this.currentUser.uid, newTerrName, this.currentUser.displayName, 0, this.newAppartArray = []);
      this.pushNewTerr(this.newTerr);
      } else {
        alert('Такой участок уже есть');
     }
    } else {
      this.newTerr = new Terr(terrId, this.currentUser.uid, newTerrName, this.currentUser.displayName, 0, this.newAppartArray = []); //работало без определения массива. Если поломается - убрать
      this.pushNewTerr(this.newTerr);
    }
  }

  pushNewTerr(terr, isUpdate?) {
    let isTrue = this.territory.some(i => i.terrId == terr.terrId);
    if (!isTrue) {
      this.territory.push(terr);
    };    
    this.dataSave.createJSON(this.territory);
    if(!isUpdate) {
      this.fireDatabase.saveTerr(terr);
    } else {
      this.fireDatabase.updateTerr(isUpdate);
    }
  }

  // appartaments

  getAppartArray(firstAppartNum, lastAppartNum):void {

    // let numOfAppart = lastAppartNum - firstAppartNum + 1;
    //проверка, есть ли уже квартиры в участке
    if (this.territory[this.terrIndex].appartaments == undefined) {
      this.territory[this.terrIndex].appartaments = [];

    for (let i=firstAppartNum; i<=lastAppartNum; i++) {
      this.territory[this.terrIndex].appartaments.push(new Appart(i, '#fff', ''));
    }
      } else {
        this.territory[this.terrIndex].appartaments = [].concat.apply([], this.territory[this.terrIndex].appartaments);
        for (let i=firstAppartNum; i<=lastAppartNum; i++) {
          this.territory[this.terrIndex].appartaments.push(new Appart(i, '#fff', ''));
          this.territory[this.terrIndex].appartaments = _.sortBy(this.territory[this.terrIndex].appartaments, 'num');
      }
    }
    this.territory[this.terrIndex].appartaments.reverse();
    this.sortByFloor();

  }

  sortByFloor():void {
    let porch = [];
    let floorCapacity = 4;
    for (let i=0; i<this.territory[this.terrIndex].appartaments.length; i = i + floorCapacity) {
      let floor = [];
      while (floor.length<floorCapacity) {
        let appartOnFloor = this.territory[this.terrIndex].appartaments[i+floor.length];
          if (!appartOnFloor) {
            break;
          }
        floor.push(appartOnFloor);
      }
      floor.reverse();
      porch.push(floor);
    }
    this.territory[this.terrIndex].appartaments = porch;
    this.pushNewTerr(this.territory[this.terrIndex]);
  }

  resorting(floorCapacity) {
    let porch = [];
    let merged = [].concat.apply([], this.territory[this.terrIndex].appartaments);
    merged = _.sortBy(merged, 'num');
    merged.reverse();
    for (var i:number = 0; i<merged.length; i = i + floorCapacity) {
      let floor = [];
      while (floor.length<floorCapacity) {
        let appartOnFloor = merged[i + floor.length];
          if (!appartOnFloor) {
            break;
          }
        floor.push(appartOnFloor);
      }
      floor = _.sortBy(floor, 'num');
      porch.push(floor);
    }
  // рассчет степени обработки участка
  let counter = 0;
    for (i=0; i<merged.length; i++) {
      let color:string = merged[i].color;
      if (color !== '#fff' && color !== '#516ac6'){
        if (color !== 'rgb(255, 255, 255)' && color !== 'rgb(65, 105, 225)') {
          counter++
        }
      }
    }
    let pct = Math.round((counter/merged.length)*100);
    this.territory[this.terrIndex].pct = pct;

    this.territory[this.terrIndex].appartaments = porch;
    this.pushNewTerr(this.territory[this.terrIndex]);
  }

  addColorOfAppart(bgrnd) {
      let floorCapacity = this.territory[this.terrIndex].appartaments[0].length;

      let tempAppartArray = [].concat.apply([], this.territory[this.terrIndex].appartaments);
      tempAppartArray[this.appIndex].color = bgrnd;

        this.resorting(floorCapacity);
  }

  addInfoAboutAppart(date, description):void {
    let floorCapacity = this.territory[this.terrIndex].appartaments[0].length;
    let tempAppartArray = [].concat.apply([], this.territory[this.terrIndex].appartaments);
    if (!tempAppartArray[this.appIndex].description) {
      this.newDescript = [];
      tempAppartArray[this.appIndex].description = this.newDescript;
      tempAppartArray[this.appIndex].description.push(new Descr(date, description));
    } else {
      tempAppartArray[this.appIndex].description.push(new Descr(date, description));
    }
    this.resorting(floorCapacity);
  }

  //удаление участков

  deleteItem(id) {
    // delete in database
    this.fireDatabase.removeTerr(this.territory[id]);
    //delete in array and storage
    this.territory.splice(id, 1);
    this.dataSave.createJSON(this.territory);
  }

  //удаление квартир
  deleteAppart(arrID) {
    let floorCapacity = this.territory[this.terrIndex].appartaments[0].length; //Установка количества квартир на этаже после удаления
    let merged = [].concat.apply([], this.territory[this.terrIndex].appartaments); //объединение квартир по этажам в один массив
    arrID.sort(function(a, b) {return b-a}); //сортировка массива индексов квартир на удаление в порядке убывания
  //удаление квартир
    for (let i = 0; i<arrID.length; i++) {
      merged.splice(arrID[i], 1);
    }
    this.territory[this.terrIndex].appartaments = merged;
    this.resorting(floorCapacity);
  }

  deleteDescription(id) {
    let floorCapacity = this.territory[this.terrIndex].appartaments[0].length;

    let merged = [].concat.apply([], this.territory[this.terrIndex].appartaments);
    merged[this.appIndex].description.splice(id, 1);

    this.resorting(floorCapacity);
  }

  getDate() {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; //January is 0!
    let yyyy = now.getFullYear();
    let HH = now.getHours();
    let MM = now.getMinutes()

    let today = dd + '.' + mm + '.' + yyyy + '; ' + HH + ':' + MM;
    return today;
  }

}
