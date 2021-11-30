import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  
  constructor(private loginService: AuthenticationService) { }

  ngOnInit() {
  }

  submit() {
    if (this.form.valid) {
      this.loginService.login(this.form.value);
    }
  }
}
