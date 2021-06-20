import { PatientDataSourceDTO } from './../../../../core/data-sources/patient-data-source DTO';
import { PatientServiceDTO } from './../../../../core/services/patient-service DTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/core/services/patient-service';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {


  @ViewChild(MatTable) table: MatTable<any>;
  totalPatients: number;

  displayedColumns: string[] = ['id', 'gender','age', 'mainDisease', 'info', 'edit', 'delete'];
  dataSource: PatientDataSourceDTO;

  constructor(
    private service: PatientServiceDTO,
    private pService: PatientService,
    private snackBar: MatSnackBar
  ) {}

 
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new PatientDataSourceDTO(this.service);
    this.dataSource.loadPatients();
    this.countPatients();
  }

  
  openSnackBar() {
     this.snackBar.open("Paciente deletado com sucesso!", "X",  {duration: 5 * 1000});
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

  deletePatient(id: number) {
    this.pService.deletePatient(id).subscribe(result => {
      console.log(result);
      this.openSnackBar();
      this.countPatients();
      this.dataSource.loadPatients();
    });

  }

}



