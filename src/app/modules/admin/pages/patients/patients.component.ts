import { PaginationDirective } from '../../../../core/services/pagination.service';
import { getDiseaseGroup } from './../../../../core/enums/DiseaseGroup';
import { HeadacheModel } from './../../../../core/model/HeadacheModel';
import { Router } from '@angular/router';
import { HeadacheService } from './../../../../core/services/headache.service';
import { FormDataService } from './../../../../core/services/form-data.service';
import { PatientInfoComponent } from './../patient-info/patient-info.component';
import { PatientDataSourceDTO } from './../../../../core/data-sources/patient-data-source DTO';
import { PatientServiceDTO } from './../../../../core/services/patient-service DTO';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/core/services/patient-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  pageSize: number = 5;
  patientsCount: number;
  totalPatients: number;
  patientsInCurrentPage: number;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'gender','age', 'diseaseGroup', 'info', 'edit', 'delete'];
  dataSource: PatientDataSourceDTO;
  p1: HeadacheModel;

  constructor(
    private service: PatientServiceDTO,
    private router: Router,
    private pService: PatientService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private patientDataService: FormDataService,
    private hService: HeadacheService,
    public pagination: PaginationDirective
  ) {}

 
  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new PatientDataSourceDTO(this.service);
    this.dataSource.loadPatients(this.pagination.pageNo - 1, this.pagination.pageSize);
    // essa merda faz algo? nem lembro
    this.countPatients();
    this.updatePagination();
  }

  reload() {
    this.patientsCount = 0;
    this.dataSource.loadPatients(this.pagination.pageNo - 1, this.pagination.pageSize);
    this.countPatients();
    this.updatePagination();
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
  
  updatePagination() {
    this.countPatientsInCurrentPage();
  }

  countPatients(): void{
    this.service.getAllpatients().subscribe(result => 
      {
        this.totalPatients = result.length;
        this.pagination.totalPages = Math.ceil(this.totalPatients / this.pagination.pageSize);
      },
      (err) => console.log("Deu erro"),
      () => console.log("Terminou de contar") 
    );
  }

  countPatientsInCurrentPage(): void {
    this.service.getAllpatientsByPag(this.pagination.pageNo - 1, this.pagination.pageSize).subscribe(result => 
      {
        this.patientsInCurrentPage = result.length
      },
      (err) => console.log("Deu erro"),
      () => {
        //TODO
        this.patientsCount = (this.pagination.pageNo - 1) * this.pageSize + this.patientsInCurrentPage;
      }
    );
  }

  deletePatient(id: number) {
    this.pService.deletePatient(id).subscribe(result => {
      console.log(result);
      this.openSnackBar();
      this.countPatients();
      this.dataSource.loadPatients(this.pagination.pageNo - 1, this.pagination.pageSize);
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

  //TODO
    //Arrumar essa função toda
  searchPatient(same: any) {
    if(same == '') {
      window.location.reload();
      return;
    }
    this.dataSource = new PatientDataSourceDTO(this.service);
    this.dataSource.loadPatientsBySame(same); 
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

}



