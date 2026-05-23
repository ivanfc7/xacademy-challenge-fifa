import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})
export class FormLoginComponent {

  private readonly router = inject(Router);
  private readonly fb  = inject(FormBuilder);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit(){
    if (this.loginForm.invalid) return;
    let username = this.loginForm.value.username;
    let correo = this.loginForm.value.password;

    console.log(`Enviando formulario con los datos de: ${username} y ${correo}`);
    this.router.navigate(['/player-list']);
  }
}
