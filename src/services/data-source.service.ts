import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  private myMethodSubject = new Subject<any>();
  myMethod$ = this.myMethodSubject.asObservable();
  constructor() { 
   }
  
  myMethod(data) {
    // console.log(data);
    this.myMethodSubject.next(data);
  }
}
