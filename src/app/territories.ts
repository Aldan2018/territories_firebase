export class Terr {
  constructor (
    public name: string,
    public own: string,
    public pct: number,
    public appartaments?) { }
};

export class Appart {
  constructor (
    public num: number,
    public color: any,
    public description?) { }
};

export class Descr {
  constructor (
    public date,
    public description) {}
};

export class Indexes {
  constructor(
    public terrIndex?:number,
    public appIndex?:number
  ) { }
};
