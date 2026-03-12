import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-group-selection',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './group-selection.html',
  styleUrl: './group-selection.css'
})
export class GroupSelectionComponent {
  // Definimos los grupos con sus colores de fondo (estilo LLM/Dark)
  groups = [
    { id: 1, name: 'Equipo Dev', description: 'Desarrollo de erpzabdiel', color: '#4f058c', icon: 'pi pi-code' },
    { id: 2, name: 'Soporte', description: 'Atención a clientes y tickets', color: '#05638c', icon: 'pi pi-headphones' },
    { id: 3, name: 'UX / Diseño', description: 'Prototipado y experiencia', color: '#8c054a', icon: 'pi pi-palette' }
  ];

  constructor(private router: Router) {}

  selectGroup(groupName: string) {
    console.log('Grupo seleccionado:', groupName);
    // Redirigimos al Home (Dashboard del grupo)
    this.router.navigate(['/home']);
  }
}
