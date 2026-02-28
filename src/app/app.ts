// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <--- INDISPENSABLE

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // <--- DEBE ESTAR AQUÍ
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}
