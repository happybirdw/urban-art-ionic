export class User {
    name: String;
    email : String;
    password: String;
    favorite: String[]; // [work._id]

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}