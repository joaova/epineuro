import { RegisterPatientFinalComponent } from './pages/register-patient-final/register-patient-final.component';
import { AuthGuard } from './../security/auth.guard';
import { RegisterPatientComponent } from './pages/register-patient/register-patient.component';
import { IndexComponent } from './../home/pages/index/index.component';
import { TeamComponent } from './../home/pages/team/team.component';
import { AboutComponent } from './../home/pages/about/about.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { AdminComponent } from './pages/admin/admin.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {path: '', component: AdminComponent,

      children: [
        {path: '', component: IndexComponent, canActivate:[AuthGuard], data: { roles: ['EP01'] }},
        {path: 'pacientes', component: PatientsComponent, canActivate:[AuthGuard], data: { roles: ['EP01'] }},
        {path: 'sobre', component: AboutComponent, canActivate:[AuthGuard], data: { roles: ['EP01'] }},
        {path: 'equipe', component: TeamComponent, canActivate:[AuthGuard], data: { roles: ['EP01'] }},
        {path: 'cadastro', component: RegisterPatientComponent, canActivate:[AuthGuard], data: { roles: ['EP01'] }},
        {path: 'cadastro-final', component: RegisterPatientFinalComponent, canActivate:[AuthGuard], data: { roles: ['EP01'] }}
      ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class AdminRoutingModule {}