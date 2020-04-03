import { AppComponent } from './app.component';
import { AppRepository } from '../infrastructure/repositories/app.repository';
import { AppSession } from '../infrastructure/sessions/app.session';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FileRepository } from '../infrastructure/repositories/file.repository';
import { FileSession } from '../infrastructure/sessions/file.session';
import { FormsModule } from '@angular/forms';
import { GapiSession } from '../infrastructure/sessions/gapi.session';
import { LoggedInGuard } from '../infrastructure/sessions/loggedInGuard';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { UserRepository } from '../infrastructure/repositories/user.repository';
import { UserSession } from '../infrastructure/sessions/user.session';
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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from 'src/components/googledrive/dashboard/dashboard.component';
import { SigninComponent } from 'src/components/googledrive/signin/signin.component';
import { 
  MsalModule,
  MsalInterceptor, 
  MsalAngularConfiguration, 
  MSAL_CONFIG,
  MSAL_CONFIG_ANGULAR,
  MsalService 
} from "@azure/msal-angular";
import { Configuration } from 'msal';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from 'src/components/onedrive/profile/profile.component';
import { HomeComponent } from 'src/components/onedrive/home/home.component';



export function initGapi(gapiSession: GapiSession) {
  return () => gapiSession.initClient();
}

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

function MSALConfigFactory(): Configuration {
  return {
    auth: {
      clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6',
      authority: "https://login.microsoftonline.com/common/",
      validateAuthority: true,
      redirectUri: "http://localhost:4200/",
      postLogoutRedirectUri: "http://localhost:4200/",
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
  };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
  return {
    popUp: !isIE,
    consentScopes: [
      "user.read",
      "openid",
      "profile",
      "api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user"
    ],
    unprotectedResources: ["https://www.microsoft.com/en-us/"],
    protectedResourceMap,
    extraQueryParameters: {}
  };
}

@NgModule({
  declarations: [
    MenuComponent,
    ViewComponent,
    AppComponent,
    DashboardComponent,
    SigninComponent,
    ProfileComponent,
    HomeComponent,
    ModalComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MsalModule,
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
    { provide: APP_INITIALIZER,
      useFactory: initGapi, 
      deps: [GapiSession], 
      multi: true 
    },
    {provide: HTTP_INTERCEPTORS, 
      useClass: MsalInterceptor, 
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService,

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
