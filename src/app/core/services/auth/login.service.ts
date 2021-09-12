import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { LoginModel } from '../../models/login.model';
import { LoginResponseModel } from '../../models/login-response.model';

import { API_URL } from '../../constants/API_URL';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logged!: boolean

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(LoginBody: LoginModel): Observable<LoginResponseModel> {
    return this.httpClient.post<LoginResponseModel>(API_URL! + 'auth/login', LoginBody);
  }

  isLogged(): boolean {
    return this.logged
  }

  public setLogged(logged: boolean) {
    this.logged = logged;
  }
}
