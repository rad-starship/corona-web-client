import { NgModule } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { HomeComponent } from './home/home.component';

import { UserListComponent }      from './user-list/user-list.component';
import { UserFormComponent }      from './user-form/user-form.component';

import { RoleListComponent }      from './role-list/role-list.component';
import { RoleFormComponent}       from "./role-form/role-form.component";

import { TenantListComponent }    from './tenant-list/tenant-list.component';
import { TenantFormComponent } from './tenant-form/tenant-form.component';

import { CoronaListComponent }    from './corona-list/corona-list.component';
import { IsraelOverallComponent } from './corona-list/israel-overall.component';

const routes: Routes = [
  { path: '',           component: HomeComponent },
  { path: 'home',       component: HomeComponent },
  { path: 'users',      component: UserListComponent },
  { path: 'adduser',    component: UserFormComponent },
  { path: 'roles',      component: RoleListComponent },
  { path: 'addrole',    component: RoleFormComponent},
  { path: 'tenants',    component: TenantListComponent },
  { path: 'addtenant',  component: TenantFormComponent },
  { path: 'corona',     component: CoronaListComponent },
  { path: 'isrealoverall',     component: IsraelOverallComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }