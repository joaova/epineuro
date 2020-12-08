import { SharedModule } from './../../shared/shared.module';
import { AuthService } from './auth.service';
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
  providers:[AuthService]
})
export class SecurityModule { }
