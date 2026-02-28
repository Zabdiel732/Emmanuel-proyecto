import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // Esta línea es la que quita el "blanco" al inicio:
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
