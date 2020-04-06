import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user.service';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleService } from './service/role.service';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantService } from './service/tenant.service';
import { CoronaListComponent } from './corona-list/corona-list.component';
import { CoronaService } from './service/corona.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    RoleListComponent,
    TenantListComponent,
    CoronaListComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, RoleService, TenantService, CoronaService],
  bootstrap: [AppComponent]
})
export class AppModule { }