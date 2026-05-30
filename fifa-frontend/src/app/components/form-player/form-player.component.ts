import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PlayerService } from '../../core/services/player.service';
import { OptionSalirComponent } from '../option-salir/option-salir.component';

@Component({
  selector: 'app-form-player',
  imports: [CommonModule, ReactiveFormsModule, OptionSalirComponent],
  templateUrl: './form-player.component.html',
  styleUrl: './form-player.component.scss'
})
export class FormPlayerComponent {
  playerForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.playerForm = this.fb.group({
      // --- DATOS PRINCIPALES (allowNull: false) ---
      fifa_version: ['24', Validators.required],
      fifa_update: ['1', Validators.required],
      player_face_url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      long_name: ['', Validators.required],
      player_positions: ['', Validators.required],
      age: [20, [Validators.required, Validators.min(15), Validators.max(50)]],
      overall: [60, [Validators.required, Validators.min(1), Validators.max(99)]],
      potential: [65, [Validators.required, Validators.min(1), Validators.max(99)]],

      // --- DATOS CLUB Y NACIONALIDAD (allowNull: true) ---
      club_name: [''],
      nationality_name: [''],
      value_eur: [0],
      wage_eur: [0],
      height_cm: [180],
      weight_kg: [75],
      preferred_foot: ['Right'],

      // --- ESTADÍSTICAS PRINCIPALES DEL JUGADOR (FIFA HEXÁGONO) ---
      pace: [50, [Validators.min(0), Validators.max(99)]],
      shooting: [50, [Validators.min(0), Validators.max(99)]],
      passing: [50, [Validators.min(0), Validators.max(99)]],
      dribbling: [50, [Validators.min(0), Validators.max(99)]],
      defending: [50, [Validators.min(0), Validators.max(99)]],
      physic: [50, [Validators.min(0), Validators.max(99)]],

      // --- OTRAS ESTADÍSTICAS (Mapeadas a por defecto para no saturar) ---
      weak_foot: [3],
      skill_moves: [3],
      international_reputation: [1],
      work_rate: ['Medium/Medium'],
      body_type: ['Normal'],
      player_traits: ['']
    });
  }

  onSubmit(): void {
    if (this.playerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos obligatorios correctamente.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

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
