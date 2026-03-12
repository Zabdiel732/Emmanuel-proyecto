import { Routes } from '@angular/router';

// Importación de los componentes de las páginas
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { GroupSelectionComponent } from './pages/group-selection/group-selection';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'group-selection',
    component: GroupSelectionComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
