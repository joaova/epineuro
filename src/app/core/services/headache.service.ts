import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HeadacheModel } from '../model/HeadacheModel';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './http/base-http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadacheService{

  constructor(private http: BaseHttpService, private httpCli: HttpClient) { }

  getPatientById(id: number): Observable<HeadacheModel> {
    return this.http
        .getAll<HeadacheModel>(`${environment.URLSERVIDOR}patient/${id}`)
        .pipe(map(x => x.data));
  }

  getAllpatients(): Observable<HeadacheModel[]> {
    return this.http
        .getAll<HeadacheModel[]>(`${environment.URLSERVIDOR}patient`)
        .pipe(map(x => x.data));
  } 

  postPatient(param: HeadacheModel) {
    return this.http
        .post<HeadacheModel>(`${environment.URLSERVIDOR}headache`, param)
  }



}
