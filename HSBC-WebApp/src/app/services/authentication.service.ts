import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router: Router, private http: HttpClient) { }

  public get token(): string {
    return localStorage.getItem("token");
  }
  
  login(formValue: any) {
    this.http.post<any>("/login", JSON.stringify(formValue)).subscribe(data => {
      localStorage.setItem("token", data.token);
      this.router.navigate(['home']);
    }, 
    error => {
      console.log(error);
    });
  }

  logout() {
      localStorage.removeItem('token');
      this.router.navigate(['login']);
  }
}
