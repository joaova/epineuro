import { FormDataService } from './../../../../core/services/form-data.service';
import { PatientModel } from './../../../../core/model/PatientModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  patient: PatientModel;
  sexo = ['Feminino', 'Masculino'];
  bol = ['não', 'sim']

  constructor(
    private patientDataService: FormDataService
  ) { }

  ngOnInit(): void {
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
      this.patient = patient;
    })
  }
  
}
