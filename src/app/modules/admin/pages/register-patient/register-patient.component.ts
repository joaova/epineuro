import { DISEASE_GROUP, SCHOLARITY, CIVIL_STATE, JOB, RELIGION, COLOR } from './../../../../core/enums/enums';
import { State } from './../../../../core/model/state-model';
import { LocationService } from './../../../../core/services/location.service';
import { City } from './../../../../core/model/city-model';
import { FormDataService } from '../../../../core/services/form-data.service';
import { PatientModel } from './../../../../core/model/PatientModel';
import { environment } from './../../../../../environments/environment';
import { DiseaseModel } from './../../../../core/model/disease-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, retry, switchMap } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {
  
  subjectPesquisa: Subject<string> = new Subject<string>();
  diseaseObs: Observable<DiseaseModel>;
  disease: DiseaseModel = {codigo: '', nome: ''};
  civilStates: string[] = CIVIL_STATE;
  colors: string[] = COLOR;
  scholarities: string[] = SCHOLARITY;
  jobs: string[] = JOB;
  religions: string[] = RELIGION;
  diseaseGr: string[] = DISEASE_GROUP;
  comorbities: DiseaseModel[] = [];
  citiesRS: Observable<City[]>;
  citiesByState: Observable<City[]>;
  states: Observable<State[]>;
  patientVerification: number = 0;
  patient: PatientModel = {
    id: null,
    gender: null,
    color: null,
    civilState: null,
    scholarity: null,
    birthState: null,
    birthCity: null,
    currentCity: null,
    job: null,
    religion: null,
    birthDate: null,
    startOutpatientFollowUp: null,
    endOutpatientFollowUp: null,
    dischargeDate: null,
    diseaseGroup: null,
    comorbities: null, 
    bmi: null,
    smoking: null,
    alcoholism: null,
    drugs: null,
    previousNeurosurgery: null,
    firstDegreeRelative: null,
    exams: null,
    medications: null
  }

  patientForm = this.fb.group({
    id: [null, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
    gender: [null, Validators.required],
    color: null,
    civilState: null,
    scholarity: null,
    birthState: null,
    birthCity: null,
    currentCity: null,
    job: null,
    religion: null,
    birthDate: [null, Validators.required],
    startOutpatientFollowUp: null,
    endOutpatientFollowUp: null,
    dischargeDate: null,
    diseaseGroup: [null, Validators.required],
    cid: [null, Validators.required], 
   
  })

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private fb: FormBuilder,
    private patientDataService: FormDataService,
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {

    // testando api localidades
    this.citiesRS = this.locationService.getCityRS();
    this.states = this.locationService.getAllStates();

    // verifica se o objeto esta vazio
    // caso exista, preenche com os dados atuais
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
      if (patient != '') {
        this.patient = patient;
        this.patientVerification = 1;
        this.patientForm = this.fb.group({
          id: [this.patient.id, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
          gender: [this.patient.gender, Validators.required],
          color: [this.patient.color],
          civilState: [this.patient.civilState],
          scholarity: [this.patient.scholarity],
          birthState: [this.patient.birthState],
          birthCity: [this.patient.birthCity],
          currentCity: [this.patient.currentCity],
          job: [this.patient.job],
          religion: [this.patient.religion],
          birthDate: [this.patient.birthDate, Validators.required],
          startOutpatientFollowUp: [this.patient.startOutpatientFollowUp],
          endOutpatientFollowUp: [this.patient.endOutpatientFollowUp],
          dischargeDate: [this.patient.dischargeDate],
          diseaseGroup: [this.patient.diseaseGroup, Validators.required],
          cid: [this.patient.comorbities, Validators.required],             
        })
        console.log(this.patient);
        this.loadCities();
        this.comorbities = this.patient.comorbities;
      }
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
      this.comorbities.push({codigo: this.disease.codigo, nome: this.disease.nome});
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
    this.comorbities.splice(i, 1);
  }

  public loadCities() {
    this.citiesByState = this.locationService.getCityByState(this.patientForm.controls.birthState.value);
  }

  advance() {
    console.log(this.patientForm)
    if(this.patientForm.valid) {
      this.patient.id = this.patientForm.get('id').value;
      this.patient.birthCity = this.patientForm.controls.birthCity.value;
      this.patient.birthDate = this.patientForm.controls.birthDate.value;
      this.patient.birthState = this.patientForm.controls.birthState.value;
      this.patient.comorbities = this.comorbities;
      this.patient.currentCity = this.patientForm.controls.currentCity.value;
      this.patient.gender = this.patientForm.controls.gender.value;
      this.patient.diseaseGroup = this.patientForm.controls.diseaseGroup.value;
      this.patient.scholarity = this.patientForm.controls.scholarity.value
      this.patient.civilState = this.patientForm.controls.civilState.value
      this.patient.job = this.patientForm.controls.job.value;
      this.patient.religion = this.patientForm.controls.religion.value;
      this.patient.startOutpatientFollowUp = this.patientForm.controls.startOutpatientFollowUp.value;
      this.patient.endOutpatientFollowUp = this.patientForm.controls.endOutpatientFollowUp.value;
      this.patient.dischargeDate = this.patientForm.controls.dischargeDate.value;
      
      if(this.patientVerification == 0) {
        this.patientDataService.changeMessage(this.patient);
      }

      this.router.navigateByUrl('/admin/cadastro-final');
    } else {
      Object.keys(this.patientForm.controls).forEach(campo => {
        const controle = this.patientForm.get(campo);
        controle.markAsTouched();
      });
    }
    
  }

}
