import { Component, inject, Input } from '@angular/core';
import { Player } from '../../core/services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-navbar',
  imports: [],
  templateUrl: './player-navbar.component.html',
  styleUrl: './player-navbar.component.scss'
})
export class PlayerNavbarComponent {
  @Input() players: Player[] = [];

  private readonly router = inject(Router);

  ngOnChanges(){
    console.log('Recibo players: ',this.players)
  }

  exportarCSV(){
    console.log('Descargando...');
    const headers = ['Nombre Completo','Nombre del Club', 'Posicion del juego', 'Nacionalidad', 'Edad'];
    const rows = this.players.map(p => [p.long_name, p.club_name, p.player_positions.replace(/,/g, '-'), p.nationality_name, p.age]);
    
    let content = headers.join(',') + '\n';
    rows.forEach(row => {
      content += row.join(',') + '\n';
    });

    const blob = new Blob([content], { type: 'text/csv;chasrset=utf-8;'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jugadores.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  goToNewPlayer(){
    this.router.navigate(['/create-player']);
  }
}
