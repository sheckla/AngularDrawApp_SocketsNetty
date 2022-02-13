import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHandlerService {
  private resultList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public resultList$: Observable<any[]> = this.resultList.asObservable();

  updateResultList(updatedList) {
    this.resultList.next(updatedList);
  }

  constructor() { }
}
