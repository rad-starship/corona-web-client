import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//https://swimlane.gitbook.io/ngx-charts/
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AuthService } from './service/auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './service/auth/token.interceptor';

import { HomeComponent } from './home/home.component';

import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user.service';

import { RoleListComponent } from './role-list/role-list.component';
import { RoleService } from './service/role.service';
import { RoleFormComponent } from './role-form/role-form.component';

import { TenantListComponent } from './tenant-list/tenant-list.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';
import { TenantService } from './service/tenant.service';

import { CoronaListComponent } from './corona-list/corona-list.component';
import { IsraelOverallComponent } from './corona-list/israel-overall.component';

import { CoronaService } from './service/corona.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    RoleListComponent,
    TenantListComponent,
    TenantFormComponent,
    CoronaListComponent,
    IsraelOverallComponent,
    RoleFormComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [
    UserService, 
    RoleService, 
    TenantService, 
    CoronaService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }