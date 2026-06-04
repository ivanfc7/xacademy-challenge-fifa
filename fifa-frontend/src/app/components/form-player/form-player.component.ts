import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlayerService, Player } from '../../core/services/player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';

@Component({
  selector: 'app-form-player',
  imports: [CommonModule, ReactiveFormsModule, MainNavbarComponent],
  templateUrl: './form-player.component.html',
  styleUrl: './form-player.component.scss'
})
export class FormPlayerComponent {
  playerForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  isEditable = false;
  playerID: number | null = null;
  player!: Player;

  private readonly destroy$ = new Subject<void>();
  private readonly router = inject(Router);

  constructor(
    private readonly fb: FormBuilder,
    private readonly playerService: PlayerService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.playerID = Number(this.route.snapshot.paramMap.get('id'));
    if(this.playerID){
      this.isEditable = true;
      this.playerService.getPlayer(this.playerID)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {this.player = data; this.cargarDatosJugador(this.player);},
          error: () => console.log('No se cargo los datos del jugador'),
          complete: () => console.log('Datos cargados')
        })
    }
  }

  initForm(): void {
    this.playerForm = this.fb.group({
      fifa_version: ['24', Validators.required],
      fifa_update: ['1', Validators.required],
      player_face_url: ['https://fifa/player/not_found', [Validators.required, Validators.pattern('https?://.+')]],
      long_name: ['', Validators.required],
      player_positions: ['', Validators.required],
      age: [20, [Validators.required, Validators.min(15), Validators.max(50)]],
      overall: [60, [Validators.required, Validators.min(1), Validators.max(99)]],
      potential: [65, [Validators.required, Validators.min(1), Validators.max(99)]],

      club_name: [''],
      nationality_name: [''],
      value_eur: [0],
      wage_eur: [0],
      height_cm: [180],
      weight_kg: [75],
      preferred_foot: ['Right'],

      pace: [50, [Validators.min(0), Validators.max(99)]],
      shooting: [50, [Validators.min(0), Validators.max(99)]],
      passing: [50, [Validators.min(0), Validators.max(99)]],
      dribbling: [50, [Validators.min(0), Validators.max(99)]],
      defending: [50, [Validators.min(0), Validators.max(99)]],
      physic: [50, [Validators.min(0), Validators.max(99)]],

      weak_foot: [3, [Validators.min(1), Validators.max(5)]],
      skill_moves: [3, [Validators.min(1), Validators.max(5)]],
      international_reputation: [3, [Validators.min(1), Validators.max(5)]],
      work_rate: ['Medium/Medium'],
      body_type: ['Normal'],
      player_traits: [''],

      // Valores por defecto no figuran en el formulario
      // Atacantes
      attacking_crossing: [50],
      attacking_finishing: [50],
      attacking_heading_accuracy: [50],
      attacking_short_passing: [50],
      attacking_volleys: [50],
      // Skills detallados
      skill_dribbling: [50],
      skill_curve: [50],
      skill_fk_accuracy: [50],
      skill_long_passing: [50],
      skill_ball_control: [50],
      // Movimientos
      movement_acceleration: [50],
      movement_sprint_speed: [50],
      movement_agility: [50],
      movement_reactions: [50],
      movement_balance: [50],
      // Poderes
      power_shot_power: [50],
      power_jumping: [50],
      power_stamina: [50],
      power_strength: [50],
      power_long_shots: [50],
      // Mentalidad
      mentality_aggression: [50],
      mentality_interceptions: [50],
      mentality_positioning: [50],
      mentality_vision: [50],
      mentality_penalties: [50],
      mentality_composure: [50],
      // Defensivos internos
      defending_marking: [50],
      defending_standing_tackle: [50],
      defending_sliding_tackle: [50],
      // Porteros
      goalkeeping_diving: [50],
      goalkeeping_handling: [50],
      goalkeeping_kicking: [50],
      goalkeeping_positioning: [50],
      goalkeeping_reflexes: [50],
      goalkeeping_speed: [50]
    });
  }

  cargarDatosJugador(player: Player){
    if(!player) return;
    
    this.playerForm.patchValue({
      fifa_version: player.fifa_version,
      fifa_update: player.fifa_update,
      player_face_url: player.player_face_url,
      long_name: player.long_name,
      player_positions: player.player_positions,
      age: player.age,
      overall: player.overall,
      potential: player.potential,
      club_name: player.club_name,
      nationality_name: player.nationality_name,
      value_eur: player.value_eur,
      wage_eur: player.wage_eur,
      height_cm: player.height_cm,
      weight_kg: player.weight_kg,
      preferred_foot: player.preferred_foot,
      pace: player.pace,
      shooting: player.shooting,
      passing: player.passing,
      dribbling: player.dribbling,
      defending: player.defending,
      physic: player.physic,
      weak_foot: player.weak_foot,
      skill_moves: player.skill_moves,
      international_reputation: player.international_reputation,
      work_rate: player.work_rate,
      body_type: player.body_type,
      player_traits: player.player_traits,
    });
  }

  volver(){
    this.router.navigate(['/player-list']);
  }

  onSubmit(): void {
    if (this.playerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios correctamente.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    if(this.isEditable){
      this.playerService.editPlayer(Number(this.playerID) ,this.playerForm.value).subscribe({
        next: (res) => {
          this.successMessage = '¡Jugador editado exitosamente!';
          this.playerForm.reset({ fifa_version: '24', fifa_update: '1', age: 20, overall: 60, potential: 65, preferred_foot: 'Right' });
        },
        error: (err) => {
          this.errorMessage = 'Hubo un error al editar el jugador.';
          console.error(err);
        },
        complete: () => this.isSubmitting = false
      });
    }else{
      this.playerService.createPlayer(this.playerForm.value).subscribe({
        next: (res) => {
          this.successMessage = '¡Jugador creado exitosamente!';
          this.playerForm.reset({ fifa_version: '24', fifa_update: '1', age: 20, overall: 60, potential: 65, preferred_foot: 'Right' });
        },
        error: (err) => {
          this.errorMessage = 'Hubo un error al guardar el jugador en el servidor.';
          console.error(err);
        },
        complete: () => this.isSubmitting = false
      });
    }
  }
}
