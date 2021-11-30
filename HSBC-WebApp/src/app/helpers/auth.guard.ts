import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authenticationService: AuthenticationService ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.authenticationService.token;
        if (token) {
            if (state.url.indexOf('/edit') == 0 && token == "userToken") {
                return false;
            }

            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}