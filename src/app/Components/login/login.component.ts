import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/auth/auth.service';
import Swal from 'sweetalert2';
export class User {
  name!: string;
  password!: string;
  email!: string;
  gender!: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private accservices: LoginService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  loginObj: any = {
    email: '',
    password: '',
  };

  isLoading = false;

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onLogin() {
    this.isLoading = true;
    this.accservices.onLogin(this.loginObj).subscribe(
      (res: any) => {
        console.log('res ', res);
        localStorage.setItem('token ', res.token);
        Swal.fire('Thank You...', 'You Login Successfully', 'success');
        this.router.navigateByUrl('');
        this.isLoading = false;
      },
      (err) => {
        Swal.fire('Sorry....', 'Invalid Email or Password', 'error');
        this.isLoading = false;
      }
    );
  }

  visible: boolean = true;
  changetype: boolean = true;

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
