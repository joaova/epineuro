import { color } from './../model/color';
import { scholarity } from './../model/scholarity';
import { BaseHttpService } from './http/base-http.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { PatientModel } from './../model/PatientModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { civilState } from '../model/civilState';
import { diseaseGroup } from '../model/diseaseGroup';
import { Exam } from '../model/ExamModel';
import { Drug } from '../model/DrugModel';
import { Surgery } from '../model/SurgeryModel';

@Injectable({
    providedIn: 'root'
  })
  export class PatientService {
  
    constructor(private http: BaseHttpService, private httpCli: HttpClient) { }

 
    getPatientById(id: number): Observable<PatientModel> {
        return this.http
            .getAll<PatientModel>(`${environment.URLSERVIDOR}patient/${id}`)
            .pipe(map(x => x.data));
    }

    getPatientModelById(id: number): Observable<PatientModel> {
        return this.http
            .getAll<PatientModel>(`${environment.URLSERVIDOR}patient/full/${id}`)
            .pipe(map(x => x.data));
    }

    getAllpatients(): Observable<PatientModel[]> {
        return this.http
            .getAll<PatientModel[]>(`${environment.URLSERVIDOR}patient`)
            .pipe(map(x => x.data));
    }

    postPatient(param: PatientModel) {
        return this.http
            .post<PatientModel>(`${environment.URLSERVIDOR}patient`, param)
    }

    putPatient(param: PatientModel) {
        return this.http
            .put<void>(
                `${environment.URLSERVIDOR}patient/${param.id}`,param
            )
            .pipe(map((x) => x.data));
    }

    deletePatient(id: number): Observable<void> {
        return this.http
            .delete<void>(`${environment.URLSERVIDOR}patient/${id}`, id)
            .pipe(map((x) => x.data));
    }

    getAllSchol(): Observable<scholarity[]> {
        return this.http
                .getAll<scholarity[]>(`${environment.URLSERVIDOR}scholarity`)
                .pipe(map(x => x.data));
    }

    getAllColor(): Observable<color[]> {
        return this.http
                .getAll<color[]>(`${environment.URLSERVIDOR}color`)
                .pipe(map(x => x.data));
    }

    getAllCivil(): Observable<civilState[]> {
        return this.http
                .getAll<civilState[]>(`${environment.URLSERVIDOR}civilstate`)
                .pipe(map(x => x.data));
    }
    getAllDisG(): Observable<diseaseGroup[]> {
        return this.http
                .getAll<diseaseGroup[]>(`${environment.URLSERVIDOR}diseasegroup`)
                .pipe(map(x => x.data));
    }

    getAllExams(): Observable<Exam[]> {
        return this.http
                .getAll<Exam[]>(`${environment.URLSERVIDOR}exam`)
                .pipe(map(x => x.data));
    }

    getAllDrugs(): Observable<Drug[]> {
        return this.http
                .getAll<Drug[]>(`${environment.URLSERVIDOR}drug`)
                .pipe(map(x => x.data));
    }

    getAllSurgeries(): Observable<Surgery[]> {
        return this.http
                .getAll<Surgery[]>(`${environment.URLSERVIDOR}surgery`)
                .pipe(map(x => x.data));
    }
}