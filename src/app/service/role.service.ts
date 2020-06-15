import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../model/role';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  private rolesUrl: string;
  private rolesidUrl: string;

  constructor(private http: HttpClient) {
    this.rolesUrl = 'http://localhost:8083/roles';
    this.rolesidUrl = 'http://localhost:8083/rolesid';
  }

  public findAll(): Observable<Role[]> {
    console.log("Find all Roles");
    return this.http.get<Role[]>(this.rolesUrl);
  }

  public getRoleName(roles: Role[], id: string)
  {    
    if (roles == null)
     return "Unknown " + id;

    for (var i = 0; i < roles.length; i++) {
      if (roles[i].id == id)
        return roles[i].name;
    }
    return "Unknown " + id;
  }

  public getRolesSample() {
    var list = [];
    list.push(new Role("1", "Admin", ["all"]));
    list.push(new Role("2", "Region-Admin", ["user_write", "user_read", "role_write", "role_read", "tenant_read", "corona_read"]));
    list.push(new Role("3", "User", ["user_read", "corona_read"]));
    return list;
  }

  public save(role: Role) {
    return this.http.post<Role>(this.rolesUrl, role);
  }

  deleteByName(roleName: String) {
    console.log("Dlete: " +this.rolesUrl+"/"+roleName)
     return this.http.delete(this.rolesUrl+"/"+roleName);

  }

  deleteById(roleId: Number) {
    return this.http.delete(this.rolesidUrl+"/"+roleId);
  }
}
