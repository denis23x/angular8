import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
   private returnUrl: string;

   private loginForm: FormGroup = this.formBuilder.group({
    identifier: ['', [ Validators.minLength(4), Validators.required ] ],
    password: ['', [ Validators.minLength(4), Validators.required ] ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']).then(() => {
        console.warn('success navigate');
      });
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/profile';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).pipe(first()).subscribe(() => {
        this.router.navigate([this.returnUrl]).then(() => {
          console.warn('success navigate');
        });
      }, error => {
        console.warn('authService.login error');
      });
    }
  }

  get identifierControl() { return this.loginForm.get('identifier'); }
  get passwordControl() { return this.loginForm.get('password'); }

}
