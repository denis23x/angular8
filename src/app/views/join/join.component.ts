import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html'
})
export class JoinComponent implements OnInit {
  joinForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']).then(() => {
        console.warn('success navigate');
      });
    }
  }

  ngOnInit() {
    this.joinForm = this.formBuilder.group({
      username: ['denisname', [Validators.minLength(4), Validators.required]],
      email: ['denis@email.ru', [Validators.minLength(4), Validators.email, Validators.required]],
      password: ['russia911', [Validators.minLength(4), Validators.required]]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/profile';
  }

  onSubmit() {
    if (this.joinForm.valid) {
      this.apiService.postRegistrationUser(this.joinForm.value).subscribe(() => {
        const identifier = this.joinForm.value.email;
        const password = this.joinForm.value.password;
        this.authService.login({ identifier, password }).pipe(first()).subscribe(() => {
          this.router.navigate([this.returnUrl]).then(() => {
            console.warn('success navigate');
          });
        }, error => {
          console.warn('authService.login error');
        });
      }, error => {
        console.warn('apiService.postRegistrationUser error');
      });
    }
  }

  get usernameControl() { return this.joinForm.get('username'); }
  get emailControl() { return this.joinForm.get('email'); }
  get passwordControl() { return this.joinForm.get('password'); }

}
