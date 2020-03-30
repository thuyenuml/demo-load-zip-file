import { AppComponent } from './app.component';
import { AppRepository } from '../infrastructure/repositories/app.repository';
import { AppSession } from '../infrastructure/sessions/app.session';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FileRepository } from '../infrastructure/repositories/file.repository';
import { FileSession } from '../infrastructure/sessions/file.session';
import { FormsModule } from '@angular/forms';
import { GapiSession } from '../infrastructure/sessions/gapi.session';
import { LoggedInGuard } from '../infrastructure/sessions/loggedInGuard';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { routing } from './app.routing';
// import { SignInComponent } from '../components/signin/signin.component';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { UserSession } from '../infrastructure/sessions/user.session';
// import { MatButtonModule, MatIconModule, MatMenuModule, MatTableModule, MatBottomSheetModule, MatDialogModule, MatInputModule, MatSelectModule, MatToolbarModule, MatProgressSpinnerModule, MatListModule } from '@angular/material';
import { SigninComponent } from 'src/components/signin/signin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { ModalComponent } from './modal/modal.component';
import { MenuComponent } from 'src/components/menu/menu.component';
import { ViewComponent } from 'src/components/view/view.component';
import { HttpClientModule } from '@angular/common/http';

export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

@NgModule({
  declarations: [
    MenuComponent,
    ViewComponent,
    AppComponent,
    DashboardComponent,
    SigninComponent,
    ModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,

    MatBottomSheetModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    MatListModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initGapi, deps: [GapiSession], multi: true },

    AppSession,
    FileSession,
    GapiSession,
    UserSession,

    AppRepository,
    FileRepository,
    UserRepository,

    LoggedInGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
