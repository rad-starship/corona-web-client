import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../model/role';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoleService {

  private rolesUrl: string;
  private rolesidUrl: string;

  constructor(private http: HttpClient) {
    this.rolesUrl = 'http://localhost:8086/roles';
    this.rolesidUrl = 'http://localhost:8086/rolesid';
  }

  public findAll(): Observable<Role[]> {
    console.log("Testing try Get")
    return this.http.get<Role[]>(this.rolesUrl);
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
