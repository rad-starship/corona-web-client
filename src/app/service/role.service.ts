import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../model/role';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class RoleService {
 
  private rolesUrl: string;
 
  constructor(private http: HttpClient) {
    this.rolesUrl = 'http://localhost:8082/roles';
  }
 
  public findAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.rolesUrl);
  }
 
  public save(role: Role) {
    return this.http.post<Role>(this.rolesUrl, role);
  }
}