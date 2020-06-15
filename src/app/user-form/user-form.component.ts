import { HttpErrorResponse} from '@angular/common/http';
import { TenantService } from './../service/tenant.service';
import { RoleService } from './../service/role.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { Role } from './../model/role';
import { Tenant } from './../model/tenant';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class UserFormComponent implements OnInit {
 
  roles: Role[];
  tenants: Tenant[];
  users: User[];

  model: User;
  submitted = false;
  subitMsg = "";
  buttonName = "Add";

  heroForm: FormGroup;

  isEditMode: boolean;
  
  constructor(private router: Router,
              private formBuilder: FormBuilder, 
              private userService: UserService,
              private roleService: RoleService,
              private tenantsService: TenantService) 
  {
    if (userService.userToUpdate === null || 
      userService.userToUpdate === undefined)
    {
      this.model = new User("", "", "", "", "", "", "", []);
      this.isEditMode = false;
    }
    else
    {
       this.model = userService.userToUpdate;
       this.model.password = "";
       this.isEditMode = true;
       this.buttonName = "Update";
    }

    this.heroForm = this.formBuilder.group({}); 
  }

  ngOnInit() {
  }
 
  onSubmit() 
  {
    this.submitted = true;

    if (this.isEditMode)
    {
      console.log("Update user", this.model);
      this.subitMsg = 'User ' + this.model.userName + ' is under update';
      this.userService.update(this.model).subscribe(res => { 
        this.subitMsg = 'User ' + this.model.userName + ' has been updated';
        console.log("Update user OK", res);
        setTimeout(() => 
        {
          this.router.navigate(['/users']);
        },
        2000);
      },
      err => {
        console.log("Update user  Failed", err);
        this.subitMsg = 'User ' + this.model.userName + ' has NOT been updated. Error: : ' + err.error.Error;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.subitMsg = 'Login expired. Redirect to login page...';
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
     this.userService.userToUpdate = null;
    }
    else
    {
      console.log("Add User", this.model);
      this.subitMsg = 'User ' + this.model.userName + ' is under creation...';
      this.userService.save(this.model).subscribe(res => { 
        this.subitMsg = 'User ' + this.model.userName + ' has been created';
        console.log("Create user OK", res);
        setTimeout(() => 
        {
          this.router.navigate(['/users']);
        },
        2000);      
      },
      err => {
        console.log("Create user  Failed", err);
        var errMsg = err || err.error || err.error.Error;
        this.subitMsg = 'User ' + this.model.userName + ' has NOT been created. Error: ' + errMsg;
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.subitMsg = 'Login expired. Redirect to login page...';
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
  }

  get diagnostic() { 
    return JSON.stringify(this.model); 
  }
}