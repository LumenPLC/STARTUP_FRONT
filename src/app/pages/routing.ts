import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },

  {
    path: 'admin/setup',
    loadChildren: () => import('../modules/setup/setup.module').then((m) => m.SetupModule),
  },
 

 

  {
    path: 'admin/reports',
    loadChildren: () => import('../modules/reports/reports.module').then((m) => m.ReportsModule),
  },

  {
    path: 'admin/user',
    loadChildren: () => import('../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
  },


  
 
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
