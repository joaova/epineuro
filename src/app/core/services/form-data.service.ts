import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor() { }

  patientData: any = '';
  private messageSourcePessoa = new  BehaviorSubject(this.patientData);
  public currentMessagePessoa = this.messageSourcePessoa.asObservable()

  changeMessage(patient: any) {
    this.messageSourcePessoa.next(patient)
  }

}
