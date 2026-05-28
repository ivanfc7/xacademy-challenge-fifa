import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {

  private readonly router = inject(Router);
  private readonly fb  = inject(FormBuilder);
  errorMessage = '';

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor (
    private readonly authService: AuthService,
  ){}

  onSubmit(){
    let email = this.loginForm.value.email;
    let password = this.loginForm.value.password;

    if (this.loginForm.invalid) {
      if(!email){
        this.errorMessage = 'Correo no es valido';
      }else if(!password){
        this.errorMessage = 'Contraseña vacia';
      }
      return;
    };

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.errorMessage = '';
        console.log(`Enviando formulario con los datos de: ${email} y ${password}`);
        this.router.navigate(['/player-list']);
      },
      error: (err)=>{
        this.errorMessage = this.authService.getMessageError();
      }
    })
  }
}
