export class People {
    constructor(
        group: number,
        name: string,
        surname: string,
        eMail: string,
        password: string
    ) { }
};

export class Group {
    constructor(
        headName: string,
        headSurname: string,
        publisher: People
    ) { }
};

export class Congregation {
    constructor(
        name: string,
        group: Group
    ) { }
};
