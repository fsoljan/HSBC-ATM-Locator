import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router: Router, private http: HttpClient) { }

  public get token(): string {
    return localStorage.getItem("token");
  }
  
  login(formValue: any) {
    this.http.post<any>("/login", JSON.stringify(formValue)).subscribe(token => {
      localStorage.setItem("token", JSON.stringify(token));
      this.router.navigate(['home']);
    });
  }

  logout() {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
  }
}
