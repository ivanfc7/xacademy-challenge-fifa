import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({providedIn:'root'})
export class LoginGuard implements CanActivate{
    constructor(authService: AuthService){}

    canActivate():boolean{
        return true;
    }
}