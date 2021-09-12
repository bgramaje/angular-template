import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRoute, RouterState } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { LoginService } from '../../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  async tokenLoginLogic(accessToken: string, refreshToken: string): Promise<boolean> {
    if (refreshToken) {
      const response = await this.authService.checkRefreshToken(refreshToken!).toPromise();
      if (response.validToken) {
        if (accessToken) {
          const validAccess = await this.authService.checkAccessToken().toPromise();
          if (validAccess.validToken) {
            this.router.navigate(['/home'])
            return false;
          } else {
            return this.createAndSetAccessToken(refreshToken);
          }
        } else {
          return this.createAndSetAccessToken(refreshToken);
        }
      } else {
        this.authService.clear();
        return true
      }
    } else return true
  }

  async createAndSetAccessToken(refreshToken: string): Promise<boolean> {
    const newToken = await this.authService.createAccessToken(refreshToken!).toPromise();
    if (newToken.recreated) {
      this.authService.setAccessToken(newToken.accessToken)
      this.router.navigate(['/home'])
      return false;
    } else return true
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();
    return this.tokenLoginLogic(accessToken!, refreshToken!);
  }
}