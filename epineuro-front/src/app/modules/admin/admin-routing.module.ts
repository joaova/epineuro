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
        {path: '', component: IndexComponent},
        {path: 'pacientes', component: PatientsComponent},
        {path: 'sobre', component: AboutComponent},
        {path: 'equipe', component: TeamComponent},
        {path: 'cadastro', component: RegisterPatientComponent}
      ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class AdminRoutingModule {}