import { HeadacheModel } from './../../../../core/model/HeadacheModel';
import { FormDataService } from '../../../../services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-patient-headache',
  templateUrl: './register-patient-headache.component.html',
  styleUrls: ['./register-patient-headache.component.css']
})
export class RegisterPatientHeadacheComponent implements OnInit {

  headacheForm = this.fb.group({
    painPattern: ['']
  })
  
  headachePatient: HeadacheModel;

  constructor(
    private fb: FormBuilder,
    private patientDataService: FormDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
        this.headachePatient = patient;
    });
  }

  return(): void {
    this.router.navigateByUrl('/admin/cadastro');
  }

}
