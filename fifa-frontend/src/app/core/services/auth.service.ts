import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService{
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly URL = 'http://localhost:8080/auth/login';
    private token: string = '';
    private messageError: string = '';

    login(data: any): Observable<any> {
        return this.http.post(this.URL, data).pipe(
            tap((res: any)=>{
                this.token = res.token;
                this.saveToken();
                console.log('Se realizo el login');
                this.router.navigate(['/player-list']);
            }),
            catchError((err)=>{
                this.messageError = err.error.message;
                return throwError(()=>err);
            })
        )
    }

    saveToken(){
        return localStorage.setItem('token', this.token);
    }

    getToken(){
        return this.token;
    }

    getMessageError(){
        return this.messageError;
    }
}