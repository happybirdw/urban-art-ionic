export class Work {
/*    photos: String[];
    title : String;
    datePosted: Date;
    address: String;
    pos : Number[];  // [<longitude>, <latitude>]
    description: String;
    idCat: Number;
    artists: String[];*/

    _id: Number = (new Date()).getTime(); // Timestamp : 1482223934345
    photos : Number[] = []; /* [1,2,3] ----> "assets/images/works/1482223934345-1.jpg" */
    title : String = "What else 2";
    datePosted : Date = new Date();
    address : String = "La jonction, Genève";
    pos: Number[] = [];  // [<longitude>, <latitude>]
    description: String  = "Nice Graffiti";
    idCat: String;
    artists: String[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

