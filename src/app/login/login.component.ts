import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    Email: ['', Validators.required],
    Password: ['', Validators.required]
  });

  /*sendData = {
    "Email": 'gaga@gmail.com',
    "Password": 'Gaga.123',
    "ConfirmPassword": 'Gaga.123'
  };*/

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {

  }

  get email() { return this.userForm.get('Email'); }
  get password() { return this.userForm.get('Password'); }

  onSubmit() {
    console.log('login');
    //this.service().subscribe(u => {this.user = u; console.log(u.Email)});
    //this.getUserInfo().subscribe(u => {this.user = u; localStorage.setItem('userToken', u)});
  }
}
