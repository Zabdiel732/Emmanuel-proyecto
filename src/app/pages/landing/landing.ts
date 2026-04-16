import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent { // Este es el nombre que busca el router
  constructor(private router: Router) {}

  goToLogin() { this.router.navigate(['/login']); }
}
