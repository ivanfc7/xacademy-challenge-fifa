import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Player, PlayerService } from '../../core/services/player.service';
import { Subject, takeUntil } from 'rxjs';
import { PlayerNavbarComponent } from '../player-navbar/player-navbar.component';
import { PlayerModalSkillsComponent } from '../player-modal-skills/player-modal-skills.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-player',
  imports: [PlayerNavbarComponent, PlayerModalSkillsComponent], 
  templateUrl: './list-player.component.html',
  styleUrl: './list-player.component.scss'
})
export class ListPlayerComponent implements OnInit, OnDestroy {
  playerList: Player[] = [];
  player!: Player;
  mostrarPerfil: boolean = false;
  currentPage: number = 1;
  cantidadFilas: number = 5; 

  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly playerService: PlayerService) {}

  ngOnInit(): void {
    this.cargarJugadores();
  }

  cargarJugadores() {
    this.playerService.getPlayersList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.playerList = data,
        error: () => {
          this.playerList = [];
          console.error('No se pudo cargar la lista de jugadores');
        },
        complete: () => console.log('Datos cargados')
      });
  }

  get totalPages(): number {
    return Math.ceil(this.playerList.length / this.cantidadFilas);
  }

  get paginatedPlayers(): Player[] {
    const index = (this.currentPage - 1) * this.cantidadFilas;
    return this.playerList.slice(index, index + this.cantidadFilas);
  }

  cambiarPagina(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  verPerfil(id: number){
    this.mostrarPerfil = true;
    document.body.style.overflow = 'hidden';
    console.log(`Se mostrara el perfil del usuario ${id}. El estado del modal cambia a ${this.mostrarPerfil}`);
    this.playerService.getPlayer(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => this.player = data,
        error: () => console.log('No se pudo cargar al jugador con id '+id),
        complete: () => console.log('Jugador cargado')
      });
  }

  ocultarPerfil(){
    this.mostrarPerfil = false;
    document.body.style.overflow = 'auto';
  }

  mostrarFormPlayer(id:number){
    this.router.navigate([`edit-player/${id}`]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}