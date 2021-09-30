import { BaseHttpService } from './http/base-http.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { PatientModel } from './../model/PatientModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}