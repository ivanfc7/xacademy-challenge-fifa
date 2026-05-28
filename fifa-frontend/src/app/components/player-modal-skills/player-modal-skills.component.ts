import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Player } from '../../core/services/player.service';
import { CommonModule } from '@angular/common';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

@Component({
  selector: 'app-player-modal-skills',
  imports: [CommonModule],
  templateUrl: './player-modal-skills.component.html',
  styleUrl: './player-modal-skills.component.scss'
})
export class PlayerModalSkillsComponent {
  @Input() player!: Player;
  @Output() cerrar = new EventEmitter<void>();

  @ViewChild('radarCanvas') radarCanvas!: ElementRef<HTMLCanvasElement>;
  chart: any;

  ngAfterViewInit(): void {
    if (this.player) {
      this.initRadarChart();
    }
  }

  manejarErrorImagen(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = '/notfound_0_120.webp'; 
  }

  initRadarChart() {
    const ctx = this.radarCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Ritmo', 'Tiro', 'Pase', 'Regate', 'Defensa', 'Físico'],
        datasets: [{
          label: 'Atributos',
          data: [
            this.player.pace || 0,
            this.player.shooting || 0,
            this.player.passing || 0,
            this.player.dribbling || 0,
            this.player.defending || 0,
            this.player.physic || 0
          ],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: '#3b82f6',
          borderWidth: 2,
          pointBackgroundColor: '#1d4ed8'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 100,
            grid: { color: '#e2e8f0' },
            pointLabels: { font: { size: 11, weight: 'bold' }, color: '#475569' }
          }
        }
      }
    });
  }
}
