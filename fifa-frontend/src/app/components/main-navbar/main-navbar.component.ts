import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-navbar',
  imports: [],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss'
})
export class MainNavbarComponent implements OnInit{
  private readonly router = inject(Router);
  emailUser:string = '';

  constructor(private readonly authService: AuthService){}

  ngOnInit(): void{
    this.authService.profile().subscribe({
      next: (res)=>{
        this.emailUser = res.email;
      },
      error: (err)=>{
        console.error('Error al obtener el perfil del usuario:', err);
      }
    })
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
