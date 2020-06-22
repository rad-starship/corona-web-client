import { HttpErrorResponse} from '@angular/common/http';
import { Router} from '@angular/router';
import { SettingsService } from './../service/settings.service';
import { Component, OnInit } from '@angular/core';
import { Settings, Authentication, Authorization, Token, PasswordPolicy, OtpPolicy, SocialLogin } from '../model/settings';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class SettingsComponent implements OnInit {

  model: Settings;
  clickMessage = ''; 
  form: FormGroup;
  description:string;

  constructor (private router: Router, 
               private settingsService: SettingsService,
               private formBuilder: FormBuilder, 
               private dialog: MatDialog) {
    this.model = new Settings(new Authentication(new Token(30, 500, 1500, 20), 
                                                 new PasswordPolicy(365, 8, 3, 1, true), 
                                                 new OtpPolicy(false, "Time Based", 8, 30), 
                                                 new SocialLogin("None")), new Authorization(), 
                                                 true, 
                                                 true);
    this.form = this.formBuilder.group({}); 
    console.log("raz", this.model);
  }

  ngOnInit(): void {

    this.settingsService.get().subscribe(
      (res:Settings) => { 
        this.model = res;
      },
      err => {
        console.log("Get Settings Failed", err);
        var errMsg = err;
        if (err.error != null)
        {
          errMsg = err.error;
          if (err.error.Error != null)
            errMsg = err.error.Error; 
        }
        this.clickMessage = 'Get Settings Failed. Error: : ' + err.message;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.clickMessage = 'Login expired. Redirect to login page...';
            // redirect to the login route
            setTimeout(() => 
            {
              this.router.navigate(['/']);
            },
            2000);   
          }
        }          
      } 
    ); 
  }

  
  onTenantKeycloak() {
    window.open('http://localhost:8080/auth/', "_blank");
  }

  onSubmit() {
    
  }
}
