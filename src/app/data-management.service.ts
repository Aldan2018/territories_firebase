import { Component, OnInit, Input }       from '@angular/core';
import { Injectable }                     from '@angular/core';
import * as _                             from "lodash";
import { Terr, Appart, Descr, Indexes }   from './territories';
import { TerritoriesCongService }         from './territories-cong.service';
import { DataSaveService }                from './data-save.service';

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

  newAppartArray:Appart[];
  newDescript: Descr[];

  constructor(private terCongServ: TerritoriesCongService,
              private dataSave: DataSaveService) { }

// sorting
sortingByAdres() {
  this.territory = _.sortBy(this.territory, ['name', 'own']);
  this.dataSave.createJSON(this.territory);
}

sortingByPct() {
  this.territory = _.sortBy(this.territory, ['pct', 'own']);
  this.dataSave.createJSON(this.territory);
}
// territory

getIndex():void {
  this.index = new Indexes;
  this.index.terrIndex = +this.terrIndex;
  this.index.appIndex = +this.appIndex;
  this.dataSave.createAppJSON(this.index);
}

  getTerrotories():void {
    this.dataBase = this.terCongServ.getTerrotories();
    this.territory = this.dataBase.BASETERR;
    this.terrIndex = this.dataBase.BASEINDEX.terrIndex;
    this.appIndex = this.dataBase.BASEINDEX.appIndex;
  // this.terCongServ.getTerrotories()
  //     .subscribe(territory => this.territory = territory);
    }

  createNewTerr(newTerrName):void {
    //проверка на наличие участка с таким-же именем
    let counter:number = 0;
    if (this.territory.length !== 0) {
      for (let i=0; i<this.territory.length; i++) {
        if (this.territory[i].name === newTerrName) {
          counter++
        }
      }
      if (counter == 0) {
        this.newTerr = new Terr(newTerrName, 'не назначен', 0, this.newAppartArray = []);
        this.pushNewTerr();
      } else {
        alert('Такой участок уже есть');
      }
    } else {
      this.newTerr = new Terr(newTerrName, 'не назначен', 0, this.newAppartArray = []); //работало без определения массива. Если поломается - убрать
      this.pushNewTerr();
    }
  }

  pushNewTerr():void {
      this.territory.push(this.newTerr);
      this.dataSave.createJSON(this.territory);
    }

// appartaments

getAppartArray(firstAppartNum, lastAppartNum):void {

  let numOfAppart = lastAppartNum - firstAppartNum + 1;
  //проверка, есть ли уже квартиры в участке
  if (this.territory[this.terrIndex].appartaments == undefined) {
    this.territory[this.terrIndex].appartaments = [];

  for (let i=firstAppartNum; i<=lastAppartNum; i++) {
    this.territory[this.terrIndex].appartaments.push(new Appart(i, '#fff'));
  }
    } else {
      this.territory[this.terrIndex].appartaments = [].concat.apply([], this.territory[this.terrIndex].appartaments);
      for (let i=firstAppartNum; i<=lastAppartNum; i++) {
        this.territory[this.terrIndex].appartaments.push(new Appart(i, '#fff'));
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
  this.dataSave.createJSON(this.territory);
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
  this.territory[this.terrIndex].pct = pct

  this.territory[this.terrIndex].appartaments = porch;
  this.dataSave.createJSON(this.territory);
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
  this.territory.splice(id, 1);
  this.dataSave.createJSON(this.territory);
}

// этот код работает, если применяется удаление нескольких участков, выбранных через чекбокс
// deleteItem(arrID) {
//   arrID.sort(function(a, b) {return b-a});
//   for (let i = 0; i<arrID.length; i++) {
//     this.territory.splice(arrID[i], 1);
//   }
//   this.dataSave.createJSON(this.territory);
// } завершение кода "чекбокс"

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
