import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MsalGuard } from '@azure/msal-angular';
import { ProfileComponent } from 'src/components/onedrive/profile/profile.component';
import { HomeComponent } from 'src/components/onedrive/home/home.component';

const routes: Routes = [
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [
  //     MsalGuard
  //   ]
  // },
  // {
  //   path: '',
  //   component: HomeComponent
  // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }