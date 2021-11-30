import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AtmModel } from '../models/atm.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  atms: AtmModel[];

  constructor(private http: HttpClient) { }

  getAtm(id: number): Observable<AtmModel> {
    return this.http.get<AtmModel>("/atms?id=" + id);
  }

  getAllAtms(): Observable<AtmModel[]> {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "test");
    console.log(headers);
    return this.http.get<AtmModel[]>("/atms");
  }

  getAtmOptions(): Observable<string[]> {
    return this.http.get<string[]>("/atmOptions");
  }
}
