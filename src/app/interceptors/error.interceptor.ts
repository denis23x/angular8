import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { NotificationService } from '@services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      // const errors = err.error.message[0].messages.map(m => m.message).join().replace(/\./g, '');
      // const errors = Object.entries(err.error.errors).map(e => e[1]);

      if (err.status === 401) {
        this.authService.logout();
        this.router.navigate(['/home']).then(() => {
          this.notificationService.addNotify({
            className: 'is-danger',
            message: 'Unauthorized',
            delay: 5000
          });
        });
      }

      if (err.status === 413) {
        this.notificationService.addNotify({
          className: 'is-danger',
          message: 'Request entity too large',
          delay: 5000
        });
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
