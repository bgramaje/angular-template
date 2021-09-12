/**
 * Esqueleto de la respuesta que devuelve el servidor a la peticion de login.
 */
export class LoginResponseModel {

    auth: boolean;
    accessToken: string;
    refreshToken : string;
    user_id: String;

    constructor( auth: boolean, accessToken: string, refreshToken: string, user_id: String) {
        this.auth = auth;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken,
        this.user_id = user_id
    }

}
