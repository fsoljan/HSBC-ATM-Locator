import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AtmMock } from '../mocks/atm.mock';
import { AtmModel } from '../models/atm.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  atms: AtmModel[];

  constructor() { }

  getAtm(id: number) {
    if (this.atms === undefined)
      this.atms = AtmMock.getAtmMocks();

    return of(this.atms.filter(atm => atm.id == id)[0]);
  }

  getAllAtms(): Observable<AtmModel[]> {
    if (this.atms === undefined)
      this.atms = AtmMock.getAtmMocks();

    return of(this.atms);
  }

  getAtmOptions(): Observable<string[]> {
    return of(["contactless", "withdraw", "deposit", "vault", "coinDeposit"]);
  }
}
