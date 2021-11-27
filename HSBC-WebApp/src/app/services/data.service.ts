import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AtmMock } from '../mocks/atm.mock';
import { AtmModel } from '../models/atm.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getAllAtms(): Observable<AtmModel[]> {
    return of(AtmMock.getAtmMocks());
  }

  getAtmOptions(): Observable<string[]> {
    return of(["option.contactless", "option.withdraw", "option.deposit", "option.vault", "option.coinDeposit"]);
  }
}
