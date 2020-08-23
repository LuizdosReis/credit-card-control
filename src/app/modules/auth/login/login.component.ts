import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.router.navigateByUrl('');
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(_ => {
          this.router.navigateByUrl('');
      }, err => {
        this.toastr.error('User or password invalid');
      });
    }
  }

}
