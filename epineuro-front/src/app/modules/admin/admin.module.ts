import { SharedModule } from './../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './pages/admin/admin.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';



@NgModule({
  declarations: [AdminComponent, PatientsComponent, RegisterPatientComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
