import { LoginComponent } from '../security/login/login.component';
import { TeamComponent } from './pages/team/team.component';
import { AboutComponent } from './pages/about/about.component';
import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,

      children: [
        {path: '', component: IndexComponent},
        {path: 'sobre', component: AboutComponent},
        {path: 'equipe', component: TeamComponent},
        {path: 'login', component: LoginComponent}
      ]
    }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class HomeRoutingModule {}