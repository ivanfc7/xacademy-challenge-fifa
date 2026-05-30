import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-option-salir',
  imports: [],
  templateUrl: './option-salir.component.html',
  styleUrl: './option-salir.component.scss'
})
export class OptionSalirComponent {
  private readonly router = inject(Router);

  volver(){
    this.router.navigate(['/player-list']);
  }
}
