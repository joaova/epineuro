import { AuthService } from './../auth.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  formLogin: FormGroup;

  hide = true;

  createForm() {
    this.formLogin = this.formBuilder.group ({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  getErrorMessage() {
    if (this.formLogin.get('email').hasError('required')) {
      return 'Campo obrigatório';
    }

    return this.formLogin.get('email').hasError('email') ? 'E-mail inválido' : '';
  }

  getErrorMessagePassword() {

    if (this.formLogin.get('password').hasError('required')) {
      return 'Campo obrigatório';
    }

  }

  
  login() {
    // debugger
    if (this.formLogin.invalid) {
      return;
    }
    //fazer a chamada
    const email = this.formLogin.value.email;
    const password = this.formLogin.value.password;
    
    localStorage.setItem('email', email);
    this.service.login(email, password);
  }

}
