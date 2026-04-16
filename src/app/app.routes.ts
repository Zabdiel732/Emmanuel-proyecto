import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing'; // Asegúrate de tener este componente
import { LoginComponent } from './pages/login/login';
import { GroupSelectionComponent } from './pages/group-selection/group-selection';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Primera página
  { path: 'login', component: LoginComponent },
  { path: 'group-selection', component: GroupSelectionComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' }
];
