import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_URL } from '../../constants/API_URL';

import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogged!: UserModel;

  constructor(
    private httpClient: HttpClient
  ) { }

  public setUserLogged(user: UserModel): void {
    this.userLogged = user;
  }

  public getUserLogged(): UserModel {
    return this.userLogged;
  }

  public async setUserLoggedById(id: String): Promise<void> {
    try {
      const user = await this.getById(id);
      user.subscribe(val => {
        if (val) this.setUserLogged(val)
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getById(id: String): Promise<Observable<UserModel>> {
    return this.httpClient.get<UserModel>(API_URL! + `users/list/${id}`);
  }
}
