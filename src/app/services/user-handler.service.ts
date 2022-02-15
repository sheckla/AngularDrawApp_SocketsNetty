import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {
  private clientName: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public clientName$: Observable<any[]> = this.clientName.asObservable();

  updateClientName(updatedClientName) {
    this.clientName.next(updatedClientName);
  }
  constructor() { }
}
