import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private idProduct = new BehaviorSubject(1);
  currentId = this.idProduct.asObservable();

  constructor() { }

  changeMessage(id: number) {
    this.idProduct.next(id)
  }

}
