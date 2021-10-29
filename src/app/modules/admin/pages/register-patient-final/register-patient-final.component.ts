import { Surgery } from './../../../../core/model/SurgeryModel';
import { Exam } from './../../../../core/model/ExamModel';
import { Drug } from './../../../../core/model/DrugModel';
import { Medication } from './../../../../core/model/MedicationModel';
import { DRUGS } from './../../../../core/enums/enums';
import { HttpClient } from '@angular/common/http';
import { DiseaseModel } from './../../../../core/model/disease-model';
import { Observable, Subject, of } from 'rxjs';
import { PatientModel } from './../../../../core/model/PatientModel';
import { PatientService } from './../../../../core/services/patient-service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../../core/services/form-data.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-patient-final',
  templateUrl: './register-patient-final.component.html',
  styleUrls: ['./register-patient-final.component.css']
})
export class RegisterPatientFinalComponent implements OnInit {
 
  prev: Surgery[] = [];
  med: Medication[] = [];
  dru: Drug[] = [];
  ex: Exam[] = [];
  examx: Observable<Exam[]>;
  neurocx: Observable<Surgery[]>;
  drugx: Observable<Drug[]>;
  subjectPesquisa: Subject<string> = new Subject<string>();
  diseaseObs: Observable<DiseaseModel>;
  disease: DiseaseModel = {id: ''};
  familyComorbities: DiseaseModel[] = [];
  medications: string[];
  patient: PatientModel;
  patientForm = this.fb.group({
    id: null,
    gender: null,
    color: null,
    civilState: null,
    scholarity: null,
    birthState: null,
    birthCity: null,
    currentCity: null,
    job: null,
    birthDate: null,
    previousNeurosurgery: null,
    exams: null,
    drugs: null,
    startOutpatientFollowUp: null,
    endOutpatientFollowUp: null,
    diseaseGroup: null,
    comorbities: null,
    smoking: null,
    alcoholism: null,
    firstDegreeRelative: null,
    medications: null,
    patientUpdated: null
  }); 

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder,
    private patientDataService: FormDataService,
    private router: Router,
    private service: PatientService
  ) { }

  ngOnInit(): void {
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
        console.log(patient);
        this.patient = patient;
        this.patientForm = this.fb.group({
          id: [this.patient.id],
          gender: [this.patient.gender],
          color: [this.patient.color],
          civilState: [this.patient.civilState],
          scholarity: [this.patient.scholarity],
          birthState: [this.patient.birthState],
          birthCity: [this.patient.birthCity],
          currentCity: [this.patient.currentCity],
          job: [this.patient.job],
          birthDate: [this.patient.birthDate],
          startOutpatientFollowUp: [this.patient.startOutpatientFollowUp],
          endOutpatientFollowUp: [this.patient.endOutpatientFollowUp],
          diseaseGroup: [this.patient.diseaseGroup],
          comorbities: [this.patient.comorbities], 
          smoking: [this.patient.smoking],
          alcoholism: [this.patient.alcoholism],
          drugs: [this.patient.drugs],
          previousNeurosurgery: [this.patient.previousNeurosurgery],
          firstDegreeRelative: [this.patient.firstDegreeRelative],
          exams: [this.patient.exams],
          medications: [this.patient.medications],
          patientUpdated: [this.patient.patientUpdated]
        })
    });

    
  }

  public pesquisa(termo: string): void {
    this.subjectPesquisa.next(termo);

  }
  
  public addICD(dis: string): void {
    if(dis != '') {
      this.familyComorbities.push({id: dis});
      this.subjectPesquisa.next('');
      this.disease = {id: ''};
    }  
  }

  public clear(): void {
    this.subjectPesquisa.next('');
    this.disease = {id: ''};
    this.patientForm.controls.firstDegreeRelative.setValue('');
  }

  public removeDisease(i: number): void {
    this.familyComorbities.splice(i, 1);
  }

  return(): void {
    console.log(this.patient)
    this.router.navigateByUrl('/admin/cadastro');
  }

  arrayToObject() {
    if(this.patientForm.controls.medications.value != null) {
      let arr = this.patientForm.controls.medications.value.split(',');
      for (let i = 0; i < arr.length; i++) {
        this.med.push({id: arr[i]});
      }
    } else {
      this.med = null;
    }

    if(this.patientForm.controls.previousNeurosurgery.value != null) {
      let arr = this.patientForm.controls.previousNeurosurgery.value;
      for (let i = 0; i < arr.length; i++) {
        this.prev.push({id: arr[i], name: null});
      }
    } else {
      this.prev = null;
    }

    if(this.patientForm.controls.exams.value != null) {
      let arr = this.patientForm.controls.exams.value;
      for (let i = 0; i < arr.length; i++) {
        this.ex.push({id: arr[i], name: null});
      }
    } else {
      this.ex = null;
    }

    if(this.patientForm.controls.drugs.value != null) {
      let arr = this.patientForm.controls.drugs.value;
      for (let i = 0; i < arr.length; i++) {
        this.dru.push({id: arr[i], name: null});
      }
    } else {
      this.dru = null;
    }
    
  }

  register(): void {
    this.arrayToObject();
    this.patient.smoking = this.patientForm.controls.smoking.value;
    this.patient.alcoholism = this.patientForm.controls.alcoholism.value;
    this.patient.drugs = this.dru;
    this.patient.previousNeurosurgery = this.prev;
    this.patient.firstDegreeRelative = this.familyComorbities;
    console.log(this.familyComorbities);
    this.patient.exams = this.ex;
    this.patient.medications = this.med;
    console.log(this.patientForm.controls.medications.value)
    console.log(this.patient);
    this.service.postPatient(this.patient).subscribe(resposta => {
      console.log(resposta);
      this.router.navigateByUrl('/admin/pacientes');
    });
  }

}
