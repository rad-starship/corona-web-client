import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RoleListComponent } from './role-list/role-list.component';
import { TenantListComponent } from './tenant-list/tenant-list.component';
import { CoronaListComponent } from './corona-list/corona-list.component';

const routes: Routes = [
  { path: 'roles',   component: RoleListComponent },
  { path: 'tenants', component: TenantListComponent },
  { path: 'users',   component: UserListComponent },
  { path: 'adduser', component: UserFormComponent },
  { path: 'corona', component: CoronaListComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }