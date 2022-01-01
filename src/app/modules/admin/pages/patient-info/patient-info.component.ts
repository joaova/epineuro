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

    if (this.patient.drugs != null) {
      this.patient.drugs.forEach(dr => {
        this.drugs.push(dr.name);
      })
    }
    
    if (this.patient.previousNeurosurgery != null) {
      this.patient.previousNeurosurgery.forEach(s => {
        this.surgery.push(s.name);
      })
    }
    
    if (this.patient.firstDegreeRelative != null) {
      this.patient.firstDegreeRelative.forEach(f => {
        this.history.push(f.id);
      })
    }
    
    if (this.patient.medications != null) {
      this.patient.medications.forEach(m => {
        this.medications.push(m.id);
      })
    }
    
    if (this.patient.exams != null) {
      this.patient.exams.forEach(e => {
        this.exams.push(e.name);
      })
    }
    
    this.patient.diseaseGroup.forEach(dg => {
      this.diseaseGroups.push(dg.name);
    })


  }
  
}
