export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'Pendiente' | 'En progreso' | 'Revisión' | 'Finalizado';
  assignedTo: string;
  priority: 'Baja' | 'Media' | 'Alta';
  createdAt: Date;
  limitDate: Date;
  comments?: string[];
  history?: string[];
}
