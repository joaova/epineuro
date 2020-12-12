import { SecurityModule } from './../security/security.module';
import { LoginComponent } from './../security/login/login.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { IndexComponent } from './pages/index/index.component';
import { TeamComponent } from './pages/team/team.component';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    IndexComponent,
    TeamComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    SecurityModule
  ]
})
export class HomeModule { }
