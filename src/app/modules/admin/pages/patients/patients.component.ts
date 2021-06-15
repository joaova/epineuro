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

  totalPatients: number;

  displayedColumns: string[] = ['id', 'gender','age', 'mainDisease', 'info', 'edit', 'delete'];
  dataSource: PatientDataSourceDTO;

  constructor(
    private service: PatientServiceDTO
  ) {}

 
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new PatientDataSourceDTO(this.service);
    this.dataSource.loadPatients();
    this.countPatients();
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

  countPatients(): any{
    this.service.getAllpatients().subscribe(result => {
      this.totalPatients = result.length
    });
  }

}



