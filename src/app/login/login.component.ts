import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { UserService } from '../user.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  user: User;
  userForm = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required]
  });
  isLoginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  get email() { return this.userForm.get('Email'); }
  get password() { return this.userForm.get('Password'); }

  onSubmit() {
    this.user = this.userForm.value;
    this.userService.logIn(this.user).subscribe((data : any)=> {
      console.log(data);
      localStorage.setItem('userToken', data.access_token);
      this.router.navigate(['/directors']);
    },
    (err : HttpErrorResponse) => {
      this.isLoginError = true;
      console.error(err);
    });
  }
}
