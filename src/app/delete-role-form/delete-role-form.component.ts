import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../service/role.service";

@Component({
  selector: 'app-delete-role-form',
  templateUrl: './delete-role-form.component.html',
  styleUrls: ['./delete-role-form.component.css']
})
export class DeleteRoleFormComponent implements OnInit {
  roleName : String
  roleId : Number

  constructor(private route: ActivatedRoute, private router: Router, private roleService: RoleService) { }

  ngOnInit(): void {
  }

  onSubmitName() {
    this.roleService.deleteByName(this.roleName).subscribe(result => this.goToRolesList())


  }

  onSubmitId() {
    this.roleService.deleteById(this.roleId).subscribe(result => this.goToRolesList())

  }

  private goToRolesList() {
    this.router.navigate(['/roles'])
  }
}
