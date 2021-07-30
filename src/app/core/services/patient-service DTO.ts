import { HeadacheModel } from './../model/HeadacheModel';
import { PatientDTO } from './../model/PatientDTO';
import { BaseHttpService } from './http/base-http.service';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class PatientServiceDTO {
  
    constructor(private http: BaseHttpService, private httpCli: HttpClient) { }


    getPatientById(id: number): Observable<PatientDTO> {
        return this.http
            .getAll<PatientDTO>(`${environment.URLSERVIDOR}patient/${id}`)
            .pipe(map(x => x.data));
    }

    getAllpatientsByPag(p: number, ps: number): Observable<PatientDTO[]> {
        return this.http
            .getAll<PatientDTO[]>(`${environment.URLSERVIDOR}patient/pagination/${p}/${ps}`)
            .pipe(map(x => x.data));
    }

    getAllpatients(): Observable<PatientDTO[]> {
        return this.http
            .getAll<PatientDTO[]>(`${environment.URLSERVIDOR}patient`)
            .pipe(map(x => x.data));
    }

    postPatient(param: HeadacheModel) {
        return this.http
            .post<HeadacheModel>(`${environment.URLSERVIDOR}headache`, param)
    }

    putPatient(param: PatientDTO) {
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