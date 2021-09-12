import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenizedReq = request;
    const access_token = this.authService.getAccessToken();

    if (access_token) {
      tokenizedReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + access_token
        }
      })
    }
    return next.handle(tokenizedReq);
  }
}
