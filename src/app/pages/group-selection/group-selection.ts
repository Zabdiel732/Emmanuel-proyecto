import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-group-selection',
  standalone: true,
  imports: [CommonModule, RouterModule, ChartModule],
  templateUrl: './group-selection.html',
  styleUrl: './group-selection.css'
})
export class GroupSelectionComponent implements OnInit {
  currentUser = 'Zabdiel';
  chartData: any;
  chartOptions: any;

  stats = {
    total: 12,
    pendientes: 4,
    enProgreso: 5,
    finalizados: 3
  };

  groups = [
    {
      name: 'Magic Doors',
      description: 'Gestión de accesos automáticos UTEQ.',
      icon: 'pi pi-bolt',
      color: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' // Azul Profundo
    },
    {
      name: 'ERP Zabdiel',
      description: 'Control de tickets y módulos administrativos.',
      icon: 'pi pi-server',
      color: 'linear-gradient(135deg, #581c87 0%, #a855f7 100%)' // Púrpura
    },
    {
      name: 'Investigación',
      description: 'Estándares de seguridad S-SDLC y OWASP.',
      icon: 'pi pi-shield',
      color: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)' // Esmeralda
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    this.chartData = {
      labels: ['Pendientes', 'En Progreso', 'Finalizados'],
      datasets: [{
        data: [this.stats.pendientes, this.stats.enProgreso, this.stats.finalizados],
        backgroundColor: ['#3b82f6', '#f59e0b', '#10b981'],
        hoverBackgroundColor: ['#60a5fa', '#fbbf24', '#34d399'],
        borderWidth: 0
      }]
    };

    this.chartOptions = {
      cutout: '75%',
      plugins: { legend: { display: false } }
    };
  }

  selectGroup(groupName: string) {
    console.log('Navegando al grupo:', groupName);
    this.router.navigate(['/home']);
  }
}
