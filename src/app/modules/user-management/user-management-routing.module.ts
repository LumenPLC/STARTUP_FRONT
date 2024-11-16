import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleComponent } from './components/user-role/user-role.component';
import { UserRoleAssignComponent } from './components/user-role-assign/user-role-assign.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-role',
        component: UserRoleComponent,
      },

      {
        path: 'user-role-assign',
        component: UserRoleAssignComponent,
      },









    ],


   

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
