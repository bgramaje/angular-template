import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { API_URL } from '../constants/API_URL';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/storage';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  async clear() {
    const data = await this.logout().toPromise();
    if (data.logout) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }

  setToken(accessToken: string, refreshToken: string) {
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  setRefreshToken(refreshToken: string) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  checkRefreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post<any>(API_URL! + 'auth/refresh-token/check', { refreshToken });
  }

  getAccessToken(): string | null {
    return sessionStorage.getItem(ACCESS_TOKEN);
  }

  setAccessToken(accessToken: string) {
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  checkAccessToken(): Observable<any> {
    return this.httpClient.get<any>(API_URL! + 'auth/access-token/check');
  }

  createAccessToken(refreshToken: string): Observable<any> {
    return this.httpClient.post<any>(API_URL! + 'auth/access-token/create', { refreshToken });
  }

  logout() {
    return this.httpClient.delete<any>(API_URL! + 'auth/logout');
  }
}
