import { LoginResponse } from './../model/loginResponse';
import { AuthService } from './../service/auth/auth.service';
import { LoginRequest } from './../model/loginRequest';
import { LoginService } from './../service/auth/login.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  clickMessage: string;
  username: string;
  password: string;
  otp: string;
  tenant: string;

  constructor(private authService: AuthService,
              private loginService: LoginService, 
              private router: Router) 
  {       
    this.username = "admin";
    this.password = "admin";
    this.otp = "";
    this.tenant = "Admin";
  }

  ngOnInit() {
  }

  login() : void {
    var loginReq = new LoginRequest(this.username, this.password, this.otp, this.tenant);
    console.log("Login user...", loginReq);

    this.clickMessage = 'User ' + this.username + ' is under Login';
    this.loginService.login(loginReq).subscribe((res:LoginResponse) => { 
      this.clickMessage = 'User ' + this.username + ' has been Login successfully';
      console.log("Login user OK", res);
      this.authService.setToken(res.access_token, res.refresh_token);
      setTimeout(() => 
      {
        this.router.navigate(['/home']);
      },
      100);
    },
    err => {
      console.log("Login Failed", err);
      this.clickMessage = 'Login Failed. Error: ' + err.error.Error;
    } 
   );      
  }
}