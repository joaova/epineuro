import { State } from './../../../../core/model/state-model';
import { LocationService } from './../../../../core/services/location.service';
import { City } from './../../../../core/model/city-model';
import { FormDataService } from '../../../../core/services/form-data.service';
import { PatientModel } from './../../../../core/model/PatientModel';
import { environment } from './../../../../../environments/environment';
import { DiseaseModel } from './../../../../core/model/disease-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, retry, switchMap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
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
  comorbities: DiseaseModel[] = [];
  citiesRS: Observable<City[]>;
  citiesByState: Observable<City[]>;
  states: Observable<State[]>;
  patientVerification: number = 0;
  patient: PatientModel = {
    id: null,
    gender: null,
    birthDate: null,
    birthState: null,
    birthCity: null,
    currentCity: null,
    comorbities: null
  }

  patientForm = this.fb.group({
    id: [''],
    gender: [''],
    birthDate: [''],
    birthState: [''],
    birthCity: [''],
    currentCity: [''],
    cid: ['']
  })

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private fb: FormBuilder,
    private patientDataService: FormDataService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {

    // testando api localidades
    this.citiesRS = this.locationService.getCityRS();
    this.states = this.locationService.getAllStates();

    console.log('hi');

    // verifica se o objeto esta vazio
    // caso exista, preenche com os dados atuais
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
      if (patient != '') {
        this.patient = patient;
        this.patientVerification = 1;
        console.log(this.patient);
        this.patientForm = this.fb.group({
          id: [this.patient.id],
          gender: [this.patient.gender],
          birthDate: [this.patient.birthDate],
          birthState: [this.patient.birthState],
          birthCity: [this.patient.birthCity],
          currentCity: [this.patient.currentCity],
          cid: ['']
        })
        this.loadCities();
        console.log(this.patient, 'hi');
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

  public advance(): void {
    this.patient.id = this.patientForm.get('id').value;
    this.patient.birthCity = this.patientForm.controls.birthCity.value;
    this.patient.birthDate = this.patientForm.controls.birthDate.value;
    this.patient.birthState = this.patientForm.controls.birthState.value;
    this.patient.comorbities = this.comorbities;
    this.patient.currentCity = this.patientForm.controls.currentCity.value;
    this.patient.gender = this.patientForm.controls.gender.value;

    if(this.patientVerification == 0) {
      this.patientDataService.changeMessage(this.patient);
    }
    console.log(this.patientVerification);
    // URL dinamica
    this.router.navigateByUrl('/admin/cadastro-cefaleia');
  }

}
