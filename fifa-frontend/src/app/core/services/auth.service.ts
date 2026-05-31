import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService{
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly URL = 'http://localhost:8080';
    private token: string = '';
    private id:number = 0;
    private emailUser: string = '';

    private messageError: string = '';

    login(data: any): Observable<any> {
        return this.http.post(this.URL+`/auth/login`, data).pipe(
            tap((res: any)=>{
                console.log('Objeto completo recibido del servidor:', res);
                this.token = res.token;
                this.id = res.id;
                this.saveToken();
                console.log('Se realizo el login');
                console.log(this.id+' --- '+this.token);
                this.router.navigate(['/player-list']);
            }),
            catchError((err)=>{
                this.messageError = err.error.message;
                return throwError(()=>err);
            })
        )
    }

    profile():Observable<any>{
        return this.http.get(this.URL+`/user/${this.id}`).pipe(
            tap((res: any)=>{
                this.emailUser = res.email;
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

    getUserId(){
        return this.id;
    }

    getEmailUser(){
        return this.emailUser;
    }

    getMessageError(){
        return this.messageError;
    }
    setMessageError(newError: string){
        this.messageError = newError;
    }
}