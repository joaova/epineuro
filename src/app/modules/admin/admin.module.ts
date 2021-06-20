import { SecurityModule } from './../security/security.module';
import { SharedModule } from './../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { RegisterPatientHeadacheComponent } from './pages/register-patient-headache/register-patient-headache.component';
import { PatientInfoComponent } from './pages/patient-info/patient-info.component';



@NgModule({
  declarations: [AdminComponent, PatientsComponent, RegisterPatientComponent, RegisterPatientHeadacheComponent, PatientInfoComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    SecurityModule
  ]
})
export class AdminModule { }
