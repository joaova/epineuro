import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hide = true;

  email = new FormControl(
    '', [Validators.required, Validators.email]
  );

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Campo obrigatório';
    }

    return this.email.hasError('email') ? 'E-mail inválido' : '';
  }

}
