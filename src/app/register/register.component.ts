import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../user.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  userForm = this.formBuilder.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]],
    ConfirmPassword: ['', [Validators.required]]
  });
  isRegistrationError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  get email() { return this.userForm.get('Email'); }
  get password() { return this.userForm.get('Password'); }
  get confirmPassword() { return this.userForm.get('ConfirmPassword'); }

  onSubmit() {
    this.user = this.userForm.value;
    this.userService.registerUser(this.user).subscribe((data: any) => {
      console.log(data);
    },
    (err : HttpErrorResponse) => {
      this.isRegistrationError = true;
      console.error(err);
    });
  }

}
