import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ticket, TicketComment } from '../../core/models/ticket.model';

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// CDK Drag & Drop
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ButtonModule, TableModule, TagModule,
    SelectButtonModule, DialogModule, InputTextModule, TextareaModule,
    DatePickerModule, SelectModule, DividerModule, DragDropModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  projectName = 'erpzabdiel';
  currentUser = 'Zabdiel';

  viewOptions = [{ label: 'Kanban', value: 'kanban' }, { label: 'Lista', value: 'list' }];
  selectedView = 'kanban';
  displayModal = false;

  ticketForm: Ticket = this.getEmptyTicket();
  newComment = '';

  // Filtros
  filterSearch = '';
  filterStatus = 'Todos';
  filterAssignment = 'Todos';

  priorityOptions = [
    { label: 'Alta', value: 'Alta' },
    { label: 'Media', value: 'Media' },
    { label: 'Baja', value: 'Baja' }
  ];

  statusOptions = [
    { label: 'Pendiente', value: 'Pendiente' },
    { label: 'En progreso', value: 'En progreso' },
    { label: 'Revisión', value: 'Revisión' },
    { label: 'Finalizado', value: 'Finalizado' }
  ];

  tickets: Ticket[] = [
    { id: '1', title: 'Configurar CORS', description: 'Seguridad backend Spring Boot', status: 'En progreso', assignedTo: 'Zabdiel', createdBy: 'Zabdiel', priority: 'Alta', createdAt: new Date(), limitDate: new Date(2026, 2, 20), comments: [], history: ['25/03/2026: Creado'] },
    { id: '2', title: 'Ajustar Login', description: 'Estilos PrimeNG dark theme', status: 'Pendiente', assignedTo: 'Sergio', createdBy: 'Zabdiel', priority: 'Media', createdAt: new Date(), limitDate: new Date(2026, 3, 5), comments: [], history: [] }
  ];

  filteredTickets: Ticket[] = [];
  todo: Ticket[] = [];
  inProgress: Ticket[] = [];
  review: Ticket[] = [];
  done: Ticket[] = [];

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit() { this.updateColumns(); }

  getEmptyTicket(): Ticket {
    const nextWeek = new Date();
    nextWeek.setDate(new Date().getDate() + 7);
    return { id: '', title: '', description: '', status: 'Pendiente', assignedTo: '', createdBy: this.currentUser, priority: 'Media', createdAt: new Date(), limitDate: nextWeek, comments: [], history: [] };
  }

  updateColumns() {
    let filtered = this.tickets.filter(t =>
      t.title.toLowerCase().includes(this.filterSearch.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(this.filterSearch.toLowerCase())
    );

    if (this.filterStatus !== 'Todos') filtered = filtered.filter(t => t.status === this.filterStatus);
    if (this.filterAssignment === 'Mis tickets') filtered = filtered.filter(t => t.assignedTo === this.currentUser);
    else if (this.filterAssignment === 'Sin asignar') filtered = filtered.filter(t => !t.assignedTo);

    this.filteredTickets = filtered;
    this.todo = filtered.filter(t => t.status === 'Pendiente');
    this.inProgress = filtered.filter(t => t.status === 'En progreso');
    this.review = filtered.filter(t => t.status === 'Revisión');
    this.done = filtered.filter(t => t.status === 'Finalizado');
  }

  isOverdue(date: any): boolean {
    if (!date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  }

  openEditModal(ticket: Ticket) {
    const cloned = JSON.parse(JSON.stringify(ticket));
    cloned.limitDate = new Date(ticket.limitDate);
    this.ticketForm = cloned;
    this.displayModal = true;
  }

  saveTicket() {
    const index = this.tickets.findIndex(t => t.id === this.ticketForm.id);
    const now = new Date().toLocaleString();

    if (index !== -1) {
      const old = this.tickets[index];
      const logs: string[] = [];

      if (old.status !== this.ticketForm.status) logs.push(`Estado: ${old.status} -> ${this.ticketForm.status}`);
      if (old.priority !== this.ticketForm.priority) logs.push(`Prioridad: ${old.priority} -> ${this.ticketForm.priority}`);
      if (new Date(old.limitDate).toDateString() !== new Date(this.ticketForm.limitDate).toDateString()) {
        logs.push(`Fecha: ${new Date(old.limitDate).toLocaleDateString()} -> ${new Date(this.ticketForm.limitDate).toLocaleDateString()}`);
      }

      if (logs.length > 0) this.ticketForm.history.unshift(`${now}: Actualizó - ${logs.join(' | ')}`);
      this.tickets[index] = { ...this.ticketForm };
    } else {
      this.ticketForm.id = Math.random().toString(36).substr(2, 5);
      this.ticketForm.history.push(`${now}: Ticket creado por ${this.currentUser}`);
      this.tickets.push({ ...this.ticketForm });
    }
    this.updateColumns();
    this.displayModal = false;
  }

  deleteTicket() {
    this.confirmationService.confirm({
      message: `¿Eliminar permanentemente "${this.ticketForm.title}"?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-trash',
      acceptLabel: 'Eliminar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.tickets = this.tickets.filter(t => t.id !== this.ticketForm.id);
        this.updateColumns();
        this.displayModal = false;
      }
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      this.ticketForm.comments.push({ user: this.currentUser, text: this.newComment, date: new Date() });
      this.ticketForm.history.unshift(`${new Date().toLocaleString()}: Comentario de ${this.currentUser}`);
      this.newComment = '';
    }
  }

  drop(event: CdkDragDrop<Ticket[]>, newStatus: any) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const ticket = event.container.data[event.currentIndex];
      ticket.history.unshift(`${new Date().toLocaleString()}: Movido a ${newStatus} (Arrastre)`);
      ticket.status = newStatus;
      const idx = this.tickets.findIndex(t => t.id === ticket.id);
      if (idx !== -1) this.tickets[idx].status = newStatus;
    }
  }

  getPrioritySeverity(p: string): "danger" | "warn" | "info" | "success" | "secondary" {
    if (p === 'Alta') return 'danger';
    if (p === 'Media') return 'warn';
    return 'info';
  }
}
