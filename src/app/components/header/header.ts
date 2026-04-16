import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, ToolbarModule, RouterLink],
  templateUrl: './header.html', // Cambiado de header.component.html a header.html
  styleUrl: './header.css'
})
export class HeaderComponent {}
