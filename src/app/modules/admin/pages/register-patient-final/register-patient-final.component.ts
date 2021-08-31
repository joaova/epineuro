import { EXAMS, NEUROSURGERY, DRUGS } from './../../../../core/enums/enums';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../environments/environment';
import { debounceTime, distinctUntilChanged, switchMap, retry, map, catchError } from 'rxjs/operators';
import { DiseaseModel } from './../../../../core/model/disease-model';
import { Observable, Subject, of } from 'rxjs';
import { PatientModel } from './../../../../core/model/PatientModel';
import { PatientService } from './../../../../core/services/patient-service';
import { Router } from '@angular/router';
import { FormDataService } from './../../../../core/services/form-data.service';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-patient-final',
  templateUrl: './register-patient-final.component.html',
  styleUrls: ['./register-patient-final.component.css']
})
export class RegisterPatientFinalComponent implements OnInit {

  examx: string[] = EXAMS;
  neurocx: string[] = NEUROSURGERY;
  drugx: string[] = DRUGS;
  subjectPesquisa: Subject<string> = new Subject<string>();
  diseaseObs: Observable<DiseaseModel>;
  disease: DiseaseModel = {codigo: '', nome: ''};
  familyComorbities: DiseaseModel[] = [];
  medications: string[];
  patient: PatientModel;
  patientForm = this.fb.group({
    id: [''],
    gender: [''],
    color: [''],
    civilState: [''],
    scholarity: [''],
    birthState: [''],
    birthCity: [''],
    currentCity: [''],
    job: [''],
    religion: [''],
    birthDate: [''],
    previousNeurosurgery: [''],
    exams: [''],
    drugs: [''],
    startOutpatientFollowUp: [''],
    endOutpatientFollowUp: [''],
    dischargeDate: [''],
    diseaseGroup: [''],
    comorbities: [''],
    bmi: [''],
    smoking: [''],
    alcoholism: [''],
    firstDegreeRelative: [''],
    medications: [''] 
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
          religion: [this.patient.religion],
          birthDate: [this.patient.birthDate],
          startOutpatientFollowUp: [this.patient.startOutpatientFollowUp],
          endOutpatientFollowUp: [this.patient.endOutpatientFollowUp],
          dischargeDate: [this.patient.dischargeDate],
          diseaseGroup: [this.patient.diseaseGroup],
          comorbities: [this.patient.comorbities], 
          bmi: [this.patient.bmi],
          smoking: [this.patient.smoking],
          alcoholism: [this.patient.alcoholism],
          drugs: [this.patient.drugs],
          previousNeurosurgery: [this.patient.previousNeurosurgery],
          firstDegreeRelative: [this.patient.firstDegreeRelative],
          exams: [this.patient.exams],
          medications: [this.patient.medications]
        })
    });

    // pesquisa doenca pelo cid10
    this.diseaseObs = this.subjectPesquisa
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((termo: string) => {

          if(termo.trim() === '') {
            return of<DiseaseModel>();
          }

          return this.http.get(`${environment.URLCIDAPI}${termo}`)
            .pipe(
              retry(10),
              map((resposta: DiseaseModel) => resposta)
            ) 
        }),
        catchError((erro: any) => {
          return of<DiseaseModel>();
        })
      );

    this.diseaseObs.subscribe((resposta: DiseaseModel) => {
      this.disease = resposta;
      // this.disease = resposta.codigo + ' ' + resposta.nome
      // this.diseaseICD = resposta.codigo;
    })

  }

  public pesquisa(termo: string): void {
    this.subjectPesquisa.next(termo);

  }
  
  public addICD(): void {
    if(this.disease.codigo != '') {
      this.familyComorbities.push({codigo: this.disease.codigo, nome: this.disease.nome});
      this.subjectPesquisa.next('');
      this.disease = {codigo: '', nome: ''};
    }  
  }

  public clear(): void {
    this.subjectPesquisa.next('');
    this.disease = {codigo: '', nome: ''};
    this.patientForm.controls.cid.setValue('');
  }

  public removeDisease(i: number): void {
    this.familyComorbities.splice(i, 1);
  }

  return(): void {
    this.router.navigateByUrl('/admin/cadastro');
  }

  register(): void {
    this.patient.bmi = this.patientForm.controls.bmi.value;
    this.patient.smoking = this.patientForm.controls.smoking.value;
    this.patient.alcoholism = this.patientForm.controls.alcoholism.value;
    this.patient.drugs = this.patientForm.controls.drugs.value;
    this.patient.previousNeurosurgery = this.patientForm.controls.previousNeurosurgery.value;
    this.patient.firstDegreeRelative = this.patientForm.controls.firstDegreeRelative.value;
    this.patient.exams = this.patientForm.controls.exams.value;
    this.patient.medications = this.patientForm.controls.medications.value.split(',');
    console.log(this.patientForm.controls.medications.value)
    console.log(this.patient);
    this.service.postPatient(this.patient).subscribe(resposta => {
      console.log(resposta);
      this.router.navigateByUrl('/admin/pacientes');
    });
  }

}
