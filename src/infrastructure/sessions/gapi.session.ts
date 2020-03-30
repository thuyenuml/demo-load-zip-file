import { Injectable, EventEmitter, NgZone } from "@angular/core";
import { AppRepository } from "../repositories/app.repository";
import { UserRepository } from '../repositories/user.repository';
import { FileRepository } from '../repositories/file.repository';
import { MatTableDataSource } from '@angular/material/table';
import { FileInfo } from "../../models/fileInfo";
const CLIENT_ID = "747655622675-50cb43d49huqmj4jfm5e53mr02blbdn5.apps.googleusercontent.com";
const API_KEY = "AIzaSyD0kEHkCoCf4xAwf7xqvMhL8mkGYRhT_Sk";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive';
declare var gapi : any;

@Injectable()
export class GapiSession {
    dataSource: MatTableDataSource<FileInfo>;
    files: FileInfo[] = [];
    googleAuth: gapi.auth2.GoogleAuth;

    constructor(
        private zone: NgZone,
        private fileRepository: FileRepository
    ) {
    }

    // Initializes the API client library and sets up sign-in state listeners.
    initClient() {
        return new Promise((resolve,reject)=>{
            gapi.load('client:auth2', () => {
                return gapi.client.init({
                    apiKey: API_KEY,
                    clientId: CLIENT_ID,
                    discoveryDocs: DISCOVERY_DOCS,
                    scope: SCOPES,
                }).then(() => {                   
                    this.googleAuth = gapi.auth2.getAuthInstance();
                    resolve();
                });
            });
        });
        
    }
    get isSignedIn(): boolean {
        return this.googleAuth.isSignedIn.get();
    }

    signIn() {
        return this.googleAuth.signIn({
            prompt: 'consent'
        }).then(() => {
            this.fileRepository.getFiles("root")
            .then((res) => {
                this.zone.run(() => {
                    this.files = res;
                    this.dataSource.data = this.files;
                    console.info(this.dataSource.data);
                });
            });
        });
    }

    signOut(): void {
        this.googleAuth.signOut();
    }
}