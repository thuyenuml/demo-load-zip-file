import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GapiSession } from 'src/infrastructure/sessions/gapi.session';
import { DataSourceService } from 'src/services/data-source.service';
const CLIENT_ID = "802915393188-gu2nuq5am1qra98fkk3pr6ibgc2a6otq.apps.googleusercontent.com";
const API_KEY = "AIzaSyDkg8anabGuJfylTvSzC_K8SyA2KzVZnjg";
const appId = "747655622675";
// const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
declare var gapi : any;
declare var google: any;
var pickerApiLoaded = false;
var oauthToken: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(
    private gapiSession: GapiSession,
    private router: Router,
    private dataSourceService: DataSourceService
  ) {}

  signIn() {
      this.gapiSession.signIn();
  }
}
