import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '@views/home/home.component';
import { LoginComponent } from '@views/login/login.component';
import { JoinComponent } from '@views/join/join.component';
import { NoteListComponent } from '@views/note-list/note-list.component';
import { NoteDetailComponent } from '@views/note-detail/note-detail.component';
import { UserListComponent } from '@views/user-list/user-list.component';
import { UserDetailComponent } from '@views/user-detail/user-detail.component';
import { JwtInterceptor} from '@interceptors/jwt.interceptor';
import { ErrorInterceptor} from '@interceptors/error.interceptor';
import { AppInitializer} from './app.initializer';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { NotificationComponent } from '@components/notification/notification.component';
import { NoteEditComponent } from '@views/note-edit/note-edit.component';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

const initializeApp = (appInitService: AppInitializer) => {
  return (): Promise<any> => appInitService.init();
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    JoinComponent,
    NoteListComponent,
    NoteDetailComponent,
    UserListComponent,
    UserDetailComponent,
    NavbarComponent,
    NotificationComponent,
    NoteEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AppInitializer,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitializer], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
