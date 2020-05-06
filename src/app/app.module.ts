import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HomeComponent } from './home/home.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user.service';

import { RoleListComponent } from './role-list/role-list.component';
import { RoleService } from './service/role.service';
import { RoleFormComponent } from './role-form/role-form.component';
import { DeleteRoleFormComponent } from './delete-role-form/delete-role-form.component';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantService } from './service/tenant.service';

import { CoronaListComponent } from './corona-list/corona-list.component';
import { CoronaService } from './service/corona.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    RoleListComponent,
    TenantListComponent,
    CoronaListComponent,
    RoleFormComponent,
    DeleteRoleFormComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [UserService, RoleService, TenantService, CoronaService],
  bootstrap: [AppComponent]
})
export class AppModule { }