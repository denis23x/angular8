import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { JoinComponent } from './views/join/join.component';
import { ReactiveFormsModule } from '@angular/forms';

import { JwtInterceptor} from './interceptors/jwt.interceptor';
import { ErrorInterceptor} from './interceptors/error.interceptor';
import { ProfileComponent } from './views/profile/profile.component';
import { UsersComponent } from './views/users/users.component';
import { NotesComponent } from './views/notes/notes.component';
import { SharedComponent } from './views/shared/shared.component';
import { UserDetailComponent } from './views/user-detail/user-detail.component';
import { SharedDetailComponent } from './views/shared-detail/shared-detail.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    JoinComponent,
    ProfileComponent,
    UsersComponent,
    NotesComponent,
    SharedComponent,
    UserDetailComponent,
    SharedDetailComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
