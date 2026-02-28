import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // <--- Importar esto

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterModule], // <--- Agregar RouterOutlet aquí
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {}
