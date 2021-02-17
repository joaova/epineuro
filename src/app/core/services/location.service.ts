import { State } from './../model/state-model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { City } from './../model/city-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStates(): Observable<State[]> {
    return this.http.get<State[]>(`${environment.URLIBGEAPI}estados`);
  }

  getCityRS(): Observable<City[]> {
    return this.http.get<City[]>(`${environment.URLIBGEAPI}estados/RS/municipios`);
  }

  getCityByState(uf: string): Observable<City[]> {
    return this.http.get<City[]>(`${environment.URLIBGEAPI}estados/${uf}/municipios`);
  }

}
 