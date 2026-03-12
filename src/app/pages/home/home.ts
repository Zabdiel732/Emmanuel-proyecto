import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../core/models/ticket.model';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
// CDK para Drag & Drop
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, TableModule,
    TagModule, SelectButtonModule, DialogModule,
    InputTextModule, TextareaModule, DragDropModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  projectName = 'erpzabdiel';
  version = 'v1.21';

  selectedView = 'kanban';
  viewOptions = [
    { label: 'Kanban', value: 'kanban', icon: 'pi pi-th-large' },
    { label: 'Lista', value: 'list', icon: 'pi pi-list' }
  ];

  displayModal = false;
  ticketForm: Ticket = this.getEmptyTicket();

  tickets: Ticket[] = [
    { id: '1', title: 'Configurar CORS', description: 'Ajustar Spring Boot', status: 'En progreso', assignedTo: 'Zabdiel', priority: 'Alta', createdAt: new Date(), limitDate: new Date() },
    { id: '2', title: 'Diseño Kanban', description: 'Modelo visual PrimeNG', status: 'Pendiente', assignedTo: 'Zabdiel', priority: 'Media', createdAt: new Date(), limitDate: new Date() },
    { id: '3', title: 'Pruebas Unitarias', description: 'Validar componentes', status: 'Revisión', assignedTo: 'Zabdiel', priority: 'Baja', createdAt: new Date(), limitDate: new Date() }
  ];

  // Listas para las columnas
  todo: Ticket[] = [];
  inProgress: Ticket[] = [];
  review: Ticket[] = [];
  done: Ticket[] = [];

  ngOnInit() {
    this.updateColumns();
  }

  private getEmptyTicket(): Ticket {
    return { id: '', title: '', description: '', status: 'Pendiente', assignedTo: 'Zabdiel', priority: 'Media', createdAt: new Date(), limitDate: new Date() };
  }

  updateColumns() {
    this.todo = this.tickets.filter(t => t.status === 'Pendiente');
    this.inProgress = this.tickets.filter(t => t.status === 'En progreso');
    this.review = this.tickets.filter(t => t.status === 'Revisión');
    this.done = this.tickets.filter(t => t.status === 'Finalizado');
  }

  drop(event: CdkDragDrop<Ticket[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transferimos el item entre los arreglos de las columnas
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // IMPORTANTE: Actualizamos el estado del ticket para que coincida con la nueva columna
      const ticketMoved = event.container.data[event.currentIndex];
      ticketMoved.status = newStatus as any;

      // Sincronizamos con la lista maestra 'tickets'
      const index = this.tickets.findIndex(t => t.id === ticketMoved.id);
      if (index !== -1) {
        this.tickets[index].status = newStatus as any;
      }
    }
  }

  getPrioritySeverity(priority: string): "danger" | "warn" | "info" | "success" | "secondary" | "contrast" | undefined {
    if (priority === 'Alta') return 'danger';
    if (priority === 'Media') return 'warn';
    return 'info';
  }

  openCreateModal() {
    this.ticketForm = this.getEmptyTicket();
    this.displayModal = true;
  }

  openEditModal(ticket: Ticket) {
    this.ticketForm = { ...ticket };
    this.displayModal = true;
  }

  saveTicket() {
    if (this.ticketForm.id) {
      const index = this.tickets.findIndex(t => t.id === this.ticketForm.id);
      this.tickets[index] = { ...this.ticketForm };
    } else {
      this.ticketForm.id = Math.random().toString(36).substring(2, 9);
      this.tickets.push({ ...this.ticketForm });
    }
    this.updateColumns();
    this.displayModal = false;
  }
}
