import { environment } from './../../../../../environments/environment';
import { DiseaseModel } from './../../../../core/model/disease-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChildren } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, retry, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  private subjectPesquisa: Subject<string> = new Subject<string>();
  public diseaseObs: Observable<DiseaseModel>;
  public disease: DiseaseModel = {codigo: '', nome: ''};
  myControl = new FormControl();
  public cids: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
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
      this.cids.push(this.disease.codigo);
      this.subjectPesquisa.next('');
      this.disease = {codigo: '', nome: ''};
    }  
  }

  public clear(): void {
    this.subjectPesquisa.next('');
    this.disease = {codigo: '', nome: ''};
    this.myControl.setValue('');
  }

  public removeDisease(i: number): void {

    this.cids.splice(i, 1);
   
  }

}
