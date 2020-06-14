import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role';
import { RoleService } from '../service/role.service';
 
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./../app.component.navbar.css']
})
export class RoleListComponent implements OnInit {
 
  roles: Role[];
 
  constructor(private roleService: RoleService) {
  }
 
  ngOnInit() {
    console.log(new Date() + ": " + JSON.stringify("Init Roles"));
    this.roleService.findAll().subscribe(data => {
      this.roles = data;
      console.log("Roles", new Date() + ": " + JSON.stringify(data));
    });

    //this.roles = this.roleService.getRolesSample();
  }
}
