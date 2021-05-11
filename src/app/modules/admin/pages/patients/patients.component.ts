import { PatientDataSourceDTO } from './../../../../core/data-sources/patient-data-source DTO';
import { PatientServiceDTO } from './../../../../core/services/patient-service DTO';
import { PatientDTO } from './../../../../core/model/PatientDTO';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Observable<PatientDTO[]>;

  displayedColumns: string[] = ['id', 'gender', 'currentCity','age', 'mainDisease'];
  dataSource: PatientDataSourceDTO;

  constructor(
    private service: PatientServiceDTO
  ) {}

 
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new PatientDataSourceDTO(this.service);
    this.dataSource.loadPatients();
  }

  public getSexo(cod: number): string {

    if(cod == 0) {
        return 'Feminino';
    }

    if(cod == 1) {
        return 'Masculino';
    }

    return null;
  }

}



