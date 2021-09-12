export class UserModel {
    _id: String;
    username: String;
    password: String;

    constructor(_id: String, username: String, password: String, _v: String) {
        this._id = _id; //implementar dto en backend
        this.username = username;
        this.password = password;
    }

}
