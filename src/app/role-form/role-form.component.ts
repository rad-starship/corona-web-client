import { Component, OnInit } from '@angular/core';
import {Role} from "../model/role";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../service/role.service";

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  role: Role;

  constructor(private route: ActivatedRoute, private router: Router, private roleService: RoleService){
    this.role = new Role();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.roleService.save(this.role).subscribe(result=>this.goToRolesList())

  }

  private goToRolesList() {
    this.router.navigate(['/roles'])
  }
}
