import { PatientService } from './../../../../core/services/patient-service';
import { HeadacheModel } from './../../../../core/model/HeadacheModel';
import { FormDataService } from '../../../../core/services/form-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-patient-headache',
  templateUrl: './register-patient-headache.component.html',
  styleUrls: ['./register-patient-headache.component.css']
})
export class RegisterPatientHeadacheComponent implements OnInit {

  headachePatient: HeadacheModel;
  headacheForm = this.fb.group({
    painPattern: ['']
  })

  constructor(
    private fb: FormBuilder,
    private patientDataService: FormDataService,
    private router: Router,
    private service: PatientService
  ) { }

  ngOnInit(): void {
    this.patientDataService.currentMessagePessoa.subscribe((patient) => {
        this.headachePatient = patient;
    });
  }

  return(): void {
    this.router.navigateByUrl('/admin/cadastro');
  }

  register(): void {
    this.headachePatient.painPattern = this.headacheForm.controls.painPattern.value;
    console.log(this.headachePatient);
    this.service.postPatient(this.headachePatient).subscribe(resposta => resposta);
    // this.router.navigateByUrl('/admin/pacientes');
  }

}
 