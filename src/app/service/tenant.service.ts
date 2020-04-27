import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tenant } from '../model/tenant';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TenantService {

  private tenantsUrl: string;

  constructor(private http: HttpClient) {
    this.tenantsUrl = 'http://localhost:8086/tenants';
  }

  public findAll(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(this.tenantsUrl);
  }

  public save(tenant: Tenant) {
    return this.http.post<Tenant>(this.tenantsUrl, tenant);
  }
}
