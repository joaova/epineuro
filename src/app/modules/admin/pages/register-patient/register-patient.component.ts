import { PatientService } from 'src/app/core/services/patient-service';
import { diseaseGroup } from './../../../../core/model/diseaseGroup';
import { scholarity } from './../../../../core/model/scholarity';
import { color } from './../../../../core/model/color';
import { civilState } from './../../../../core/model/civilState';
import { State } from './../../../../core/model/state-model';
import { LocationService } from './../../../../core/services/location.service';
import { City } from './../../../../core/model/city-model';
import { FormDataService } from '../../../../core/services/form-data.service';
import { PatientModel } from './../../../../core/model/PatientModel';
import { DiseaseModel } from './../../../../core/model/disease-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
  disease: DiseaseModel = {id: ''};
  civilStates: Observable<civilState[]>;
  colors: Observable<color[]>;
  scholarities: Observable<scholarity[]>;
  diseaseGr: Observable<diseaseGroup[]>;
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
    birthDate: null,
    startOutpatientFollowUp: null,
    endOutpatientFollowUp: null,
    diseaseGroup: null,
    comorbities: null, 
    smoking: null,
    alcoholism: null,
    drugs: null,
    previousNeurosurgery: null,
    firstDegreeRelative: null,
    exams: null,
    medications: null,
    patientUpdated: null
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
    birthDate: [null, Validators.required],
    startOutpatientFollowUp: null,
    endOutpatientFollowUp: null,
    dischargeDate: null,
    diseaseGroup: [null, Validators.required],
    cid: [null, Validators.required], 
    patientUpdated: null
   
  })

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private fb: FormBuilder,
    private patientDataService: FormDataService,
    private locationService: LocationService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {

    // testando api localidades
    this.citiesRS = this.locationService.getCityRS();
    this.states = this.locationService.getAllStates();

    // inicializa as variáveis do banco
    this.scholarities = this.patientService.getAllSchol();
    this.colors = this.patientService.getAllColor();
    this.diseaseGr = this.patientService.getAllDisG();
    this.civilStates = this.patientService.getAllCivil();

    // verifica se o objeto esta vazio
    // caso exista, preenche com os dados atuais
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
      if (patient != '') {
        this.patient = patient;
        this.patientVerification = 1;
        this.patientForm = this.fb.group({
          id: [this.patient.id, [Validators.required,Validators.pattern(/^[0-9]\d*$/)]],
          gender: [this.patient.gender, Validators.required],
          color: [this.patient.color == null ? null : this.patient.color.id],
          civilState: [this.patient.civilState == null ? null : this.patient.civilState.id],
          scholarity: [this.patient.scholarity == null ? null : this.patient.scholarity.id],
          birthState: [this.patient.birthState],
          birthCity: [this.patient.birthCity],
          currentCity: [this.patient.currentCity],
          job: [this.patient.job],
          birthDate: [this.patient.birthDate, Validators.required],
          startOutpatientFollowUp: [this.patient.startOutpatientFollowUp],
          endOutpatientFollowUp: [this.patient.endOutpatientFollowUp],
          diseaseGroup: [this.patient.diseaseGroup.id, Validators.required],
          cid: [this.patient.comorbities, Validators.required],  
          patientUpdated: [this.patient.patientUpdated]           
        })
        console.log(this.patient);
        console.log(this.patientForm.controls.color.value)
        this.loadCities();
        this.comorbities = this.patient.comorbities;

      }
    });

    // inicializa variaveis, pegando do back-end
    

  }
  
  public addICD(dis: string): void {
    if(dis != '') {
      this.comorbities.push({id: dis});
      this.subjectPesquisa.next('');
      this.disease = {id: ''};
    }  
  }

  public clear(): void {
    this.subjectPesquisa.next('');
    this.disease = {id: ''};
    this.patientForm.controls.cid.setValue('');
  }

  public removeDisease(i: number): void {
    this.comorbities.splice(i, 1);
  }

  public loadCities() {
    this.citiesByState = this.locationService.getCityByState(this.patientForm.controls.birthState.value);
  }

  advance() {

    if (this.comorbities.length == 0) {
      this.patientForm.controls.cid.setValue(null);
    }
    if(this.patientForm.valid) {
      this.patient.id = this.patientForm.get('id').value;
      this.patient.birthCity = this.patientForm.controls.birthCity.value;
      this.patient.birthDate = this.patientForm.controls.birthDate.value;
      this.patient.birthState = this.patientForm.controls.birthState.value;
      this.patient.comorbities = this.comorbities;
      this.patient.currentCity = this.patientForm.controls.currentCity.value;
      this.patient.gender = this.patientForm.controls.gender.value;
      this.patient.diseaseGroup = {id: this.patientForm.controls.diseaseGroup.value, name: null};
      this.patient.job = this.patientForm.controls.job.value;
      this.patient.startOutpatientFollowUp = this.patientForm.controls.startOutpatientFollowUp.value;
      this.patient.endOutpatientFollowUp = this.patientForm.controls.endOutpatientFollowUp.value;

      if (this.patientForm.controls.color.value != null) {
        console.log("aaaaaa")
        this.patient.color = {id: this.patientForm.controls.color.value, name: null};
      } 

      if (this.patientForm.controls.scholarity.value != null) {
        this.patient.scholarity = {id: this.patientForm.controls.scholarity.value, name: null}
      } 

      if (this.patientForm.controls.civilState.value != null) {
        this.patient.civilState = {id: this.patientForm.controls.civilState.value, name: null}
      }

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
