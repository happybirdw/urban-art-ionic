export class Work {
/*    photos: String[];
    title : String;
    datePosted: Date;
    address: String;
    pos : Number[];  // [<longitude>, <latitude>]
    description: String;
    idCat: Number;
    artists: String[];*/
    
    photos = ["data:image/jpeg;base64"];
    title = "What else";
    datePosted = new Date();
    address = "La jonction, Genève";
    pos = [];  // [<longitude>, <latitude>]
    description = "Nice Graffiti";
    idCat = 1;
    artists = ["srdtfghfd"];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

