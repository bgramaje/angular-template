import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, ActivatedRoute, RouterState } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { LoginService } from '../../services/auth/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  async tokenAuthLogic(accessToken: string, refreshToken: string): Promise<boolean> {
    if (refreshToken) {
      const response = await this.authService.checkRefreshToken(refreshToken!).toPromise();
      if (response.validToken) {
        if (accessToken) {
          const validAccess = await this.authService.checkAccessToken().toPromise();
          if (validAccess.validToken) {
            return true;
          } else {
            return this.createAndSetAccessToken(refreshToken!)
          }
        } else {
          return this.createAndSetAccessToken(refreshToken!)
        }
      } else {
        this.authService.clear();
        this.router.navigate(['/auth/login'])
        return false
      }
    } else {
      this.router.navigate(['/auth/login'])
      return false
    }
  }

  async createAndSetAccessToken(refreshToken: string): Promise<boolean> {
    const newToken = await this.authService.createAccessToken(refreshToken!).toPromise();
    if (newToken.recreated) {
      this.authService.setAccessToken(newToken.accessToken)
      return true;
    } else {
      this.router.navigate(['/auth/login'])
      return false
    }
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //token logic goes here 
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();
    return this.tokenAuthLogic(accessToken!, refreshToken!);
  }

}
