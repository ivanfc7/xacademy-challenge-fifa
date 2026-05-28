import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, throwError } from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    if(token){
        req = req.clone({
            setHeaders:{
              Authorization: `Bearer ${token}`
            }
        });
    }

    return next(req).pipe(
        catchError((error: HttpErrorResponse)=>{
            if(error.status === 401 || error.status === 403 || error.status === 502){
                authService.setMessageError("Token expirado o invalido");
                router.navigate(['/']);
            }
            return throwError(()=>error);
        })
    )
}