import { Component, OnInit } from '@angular/core';
import { Tenant } from '../model/tenant';
import { TenantService } from '../service/tenant.service';
 
@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.css']
})
export class TenantListComponent implements OnInit {
 
  tenants: Tenant[];
 
  constructor(private tenantService: TenantService) {
  }
 
  ngOnInit() {
    console.log(new Date() + ": " + JSON.stringify("Init Tenants"));
    this.tenantService.findAll().subscribe(data => {
      this.tenants = data;
      console.log(new Date() + ": " + JSON.stringify(data));
    });
  }
}
