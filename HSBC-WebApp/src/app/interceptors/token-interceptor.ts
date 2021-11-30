import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token != null){
        const authReq = req.clone({
            headers: new HttpHeaders({
              'Authorization': token
            })
        });

        return next.handle(authReq);
    }

    return next.handle(req);
  }
}