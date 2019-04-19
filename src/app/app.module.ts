import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatButtonModule, MatTableModule, 
  MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatPaginatorModule, MatSortModule } from '@angular/material';


import { AppRoutnigModule } from './app-routnig.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth-interceptor';

import { AppComponent } from './app.component';
import { DirectorsComponent } from './directors/directors.component';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { MessagesComponent } from './messages/messages.component';
import { DirectorFormComponent } from './director-form/director-form.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DirectorDeleteDialogComponent } from './director-delete-dialog/director-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DirectorsComponent,
    DirectorDetailComponent,
    MoviesComponent,
    MessagesComponent,
    DirectorFormComponent,
    MovieDetailComponent,
    MovieFormComponent,
    LoginComponent,
    RegisterComponent,
    DirectorDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutnigModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [DirectorDeleteDialogComponent]
})
export class AppModule { }
