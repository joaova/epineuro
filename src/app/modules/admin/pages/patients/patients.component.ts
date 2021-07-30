import { getDiseaseGroup } from './../../../../core/enums/DiseaseGroup';
import { HeadacheModel } from './../../../../core/model/HeadacheModel';
import { Router } from '@angular/router';
import { HeadacheService } from './../../../../core/services/headache.service';
import { FormDataService } from './../../../../core/services/form-data.service';
import { PatientInfoComponent } from './../patient-info/patient-info.component';
import { PatientDataSourceDTO } from './../../../../core/data-sources/patient-data-source DTO';
import { PatientServiceDTO } from './../../../../core/services/patient-service DTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/core/services/patient-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  totalPatients: number;
  patientsInCurrentPage: number;
  patientCount: number = 0;
  currentPageSize: number = 5;
  currentPage: number = 0;
  add: boolean = true;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'gender','age', 'diseaseGroup', 'info', 'edit', 'delete'];
  dataSource: PatientDataSourceDTO;
  p1: HeadacheModel;
  isNextAv: boolean;
  isPreviousAv: boolean;

  constructor(
    private service: PatientServiceDTO,
    private router: Router,
    private pService: PatientService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private patientDataService: FormDataService,
    private hService: HeadacheService
  ) {}

 
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new PatientDataSourceDTO(this.service);
    this.dataSource.loadPatients(this.currentPage, this.currentPageSize);
    this.countPatients();
    this.countPatientsInCurrentPage(this.currentPage, this.currentPageSize, this.add);
  }

  reloadPagination() {
    this.dataSource.loadPatients(this.currentPage, this.currentPageSize);
    this.countPatientsInCurrentPage(this.currentPage, this.currentPageSize, this.add);
    this.updateCondition();
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

  countPatients(): void{
    this.service.getAllpatients().subscribe(result => 
      {this.totalPatients = result.length;},
      (err) => console.log("Deu erro"),
      () => console.log("Terminou de contar") 
    );
  }

  countPatientsInCurrentPage(page: number, pageSize: number, add: boolean): void {
    this.service.getAllpatientsByPag(page, pageSize).subscribe(result => 
      {
        if(!add) {
          this.patientCount = this.patientCount - this.patientsInCurrentPage;
        }
        this.patientsInCurrentPage = result.length
      },
      (err) => console.log("Deu erro"),
      () => {
        if (add) {
          this.patientCount = this.patientCount + this.patientsInCurrentPage;
        } 
        this.updateCondition();
      }
    );
  }

  deletePatient(id: number) {
    this.pService.deletePatient(id).subscribe(result => {
      console.log(result);
      this.openSnackBar();
      this.countPatients();
      this.dataSource.loadPatients(this.currentPage, this.currentPageSize);
      this.updateCondition();
    });

  }

  editPatient(id: number) {
    this.hService.getPatientById(id)
    .subscribe(result => {
      this.p1 = result;
    },
    (err) => (console.log("Deu ruim")),
    () => {
      this.patientDataService.changeMessage(this.p1);  
      this.router.navigateByUrl('/admin/cadastro'); 
    });   
  }
 
  eraseCurrentPatient() {
    this.patientDataService.changeMessage("");
  }

  searchPatient(same: number) {
    console.log(same);
    this.dataSource = new PatientDataSourceDTO(this.service);
    this.dataSource.loadPatientsBySame(same);
    this.countPatients();
  }

  openDialog() {
    const dialogRef = this.dialog.open(PatientInfoComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getDG(n: number): String {
    return getDiseaseGroup(n);    
  }

  updateCondition() {
    if(this.totalPatients / this.patientCount > 1) {
      this.isNextAv = true;
    } else {
      this.isNextAv = false;
    }
    
    if(this.patientCount > this.patientsInCurrentPage) {
      console.log("hey")
      this.isPreviousAv = true;
    } else {
      this.isPreviousAv = false;
    }
  }

  nextPage() {
    if(!this.isNextAv) {
      return;
    }

    this.currentPage = this.currentPage + 1;
    this.add = true;
    this.dataSource.loadPatients(this.currentPage, this.currentPageSize);
    this.countPatientsInCurrentPage(this.currentPage, this.currentPageSize, this.add);

  }

  previousPage() {
    if(!this.isPreviousAv) {
      return;
    }

    this.currentPage = this.currentPage -1;
    this.add = false;
    this.dataSource.loadPatients(this.currentPage, this.currentPageSize);
    this.countPatientsInCurrentPage(this.currentPage, this.currentPageSize, this.add);

  }
}



