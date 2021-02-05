import { PatientDataSource } from './../../../../core/data-sources/patient-data-source';
import { PatientService } from './../../../../core/services/patient-service';
import { PatientModel } from './../../../../core/model/PatientModel';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients: Observable<PatientModel[]>;

  displayedColumns: string[] = ['id', 'gender', 'birthDate', 'birthState', 'birthCity', 'currentCity', 'comorbities'];
  dataSource: PatientDataSource;

  constructor(
    private service: PatientService
  ) {}

 
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new PatientDataSource(this.service);
    this.dataSource.loadPatients();
  }

}



