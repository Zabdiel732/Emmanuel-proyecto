export interface TicketComment {
  user: string;
  text: string;
  date: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'Pendiente' | 'En progreso' | 'Revisión' | 'Finalizado';
  assignedTo: string;
  createdBy: string;
  priority: 'Alta' | 'Media' | 'Baja';
  createdAt: Date;
  limitDate: Date;
  comments: TicketComment[];
  history: string[];
}
