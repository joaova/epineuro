import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SharedModule } from './../../shared/shared.module';
import { SecurityRoutingModule } from './security-routing.modules';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    SharedModule
  ],
  providers:[AuthGuard]
})
export class SecurityModule { }
