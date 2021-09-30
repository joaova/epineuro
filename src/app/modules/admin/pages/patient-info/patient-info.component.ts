import { CIVIL_STATE, COLOR, SCHOLARITY, JOB, RELIGION, DISEASE_GROUP } from './../../../../core/enums/enums';
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
  sexo = ['Feminino', 'Masculino']
  civilStates: string[] = CIVIL_STATE;
  colors: string[] = COLOR;
  scholarities: string[] = SCHOLARITY;
  jobs: string[] = JOB;
  religions: string[] = RELIGION;
  diseaseGr: string[] = DISEASE_GROUP;

  constructor(
    private patientDataService: FormDataService
  ) { }

  ngOnInit(): void {
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
      this.patient = patient;
    })
  }
  
}
