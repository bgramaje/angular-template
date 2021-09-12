import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoginResponseModel } from 'src/app/core/models/login-response.model';
import { LoginModel } from 'src/app/core/models/login.model';
import { LoginService } from 'src/app/core/services/auth/login.service';
import { UserService } from 'src/app/core/services/auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  username: string = "admin";
  password: string = "admin";

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private authService: AuthService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

  async login(): Promise<void> {
    try {
      const loginBody: LoginModel = { 'username': this.username, 'password': this.password }
      const loginResponse: LoginResponseModel = await this.loginService.login(loginBody).toPromise();

      if (loginResponse.auth) {
        this.userService.setUserLoggedById(loginResponse.user_id);
        this.authService.setToken(loginResponse.accessToken, loginResponse.refreshToken)
        this.route.navigate(['/home']);
      }

    } catch (error) {
      console.error(error)
      throw (error)
    }
  }

}
