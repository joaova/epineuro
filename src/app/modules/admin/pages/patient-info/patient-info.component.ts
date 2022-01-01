import { PatientCompleteDTO } from './../../../../core/model/PatientCompleteDTO';
import { FormDataService } from './../../../../core/services/form-data.service';
import { Component, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-patient-info',
  templateUrl: './patient-info.component.html',
  styleUrls: ['./patient-info.component.css']
})
export class PatientInfoComponent implements OnInit {

  patient: PatientCompleteDTO;
  sexo = ['Feminino', 'Masculino'];
  bol = ['não', 'sim']
  comorbities: string[] = [];
  history: string[] = [];
  drugs: string[] = [];
  diseaseGroups: string[] = [];
  medications: string[] = [];
  exams: string[] = [];
  surgery: string[] = [];

  constructor(
    private patientDataService: FormDataService
  ) { }

  ngOnInit(): void {
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
      this.patient = patient;
    })

    this.patient.comorbities.forEach(d => {
      this.comorbities.push(d.id);
    })

    this.patient.drugs.forEach(dr => {
      this.drugs.push(dr.name);
    })

    this.patient.previousNeurosurgery.forEach(s => {
      this.surgery.push(s.name);
    })

    this.patient.firstDegreeRelative.forEach(f => {
      this.history.push(f.id);
    })

    this.patient.medications.forEach(m => {
      this.medications.push(m.id);
    })

    this.patient.exams.forEach(e => {
      this.exams.push(e.name);
    })

    this.patient.diseaseGroup.forEach(dg => {
      this.diseaseGroups.push(dg.name);
    })

  }
  
}
