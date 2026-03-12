import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonModule, RippleModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  projectName: string = 'erpzabdiel';
  version: string = 'v1.21'; // La versión que se ve en tu estructura de carpetas

  // Listado de rutas para el navbar
  navItems = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/home' },
    { label: 'Finanzas', icon: 'pi pi-money-bill', route: '/finanzas' },
    { label: 'Inventario', icon: 'pi pi-box', route: '/inventario' },
    { label: 'Usuarios', icon: 'pi pi-users', route: '/usuarios' }
  ];
}
