import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@models/user';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login({ identifier, password }): Observable<any> {
    return this.apiService.postLoginUser({ identifier, password }).pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(new User(user));
      return user;
    }));
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']).then(() => {
      console.warn('success navigate');
    });
  }

  public updateUserInner(user): void {
    const { jwt } = JSON.parse(localStorage.getItem('currentUser'));
    localStorage.setItem('currentUser', JSON.stringify({ jwt, user }));
    this.currentUserSubject.next(new User({ jwt, user }));
  }
}
