export class Work {
    photos: String[];
    title : String;
    datePosted: Date;
    address: String;
    pos : Number[];  // [<longitude>, <latitude>]
    description: String;
    idCat: Number;
    artists: String[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

const work = new Work({
  photos : this.photos
})