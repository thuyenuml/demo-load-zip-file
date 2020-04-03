import { Component, NgZone, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
// import { FileInfo } from "../../../models/fileInfo";
import { FileRepository } from 'src/infrastructure/repositories/file.repository';
import { GapiSession } from 'src/infrastructure/sessions/gapi.session';
import { DataService } from 'src/services/data.service';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { FileInfo } from 'src/models/fileInfo';
declare const Buffer;
declare var require: any;
declare var MSBlobBuilder: any;

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

    xmlDoc: Document;
    zip: JSZip;
    dataSource: MatTableDataSource<FileInfo>;
    displayedColumns: string[] = ["icon", "name", "modifiedTime", "size"];
    files: FileInfo[] = [];

    constructor(
        private fileRepository: FileRepository,
        private gapiSession: GapiSession,
        private zone: NgZone,
        private dataService: DataService,
        private http: HttpClient
    ) {
        this.zip = new JSZip();
        this.dataSource = new MatTableDataSource(this.files);
    }
    
    getData(id: string): Observable<any> {     
        // let user = gapi.auth2.getAuthInstance().currentUser.get();
        // let oauthToken = user.getAuthResponse().access_token;
        // var url = require("url");
        let urls = `https://www.googleapis.com/drive/v3/files/${id}?supportsAllDrives=true&fields=*&key=AIzaSyC1KfB3x_55pqr8QjKOEBOFDQO1hY4ciD4`;
        // let urlContent = `https://drive.google.com/uc?id=${id}&export=download`;
        // console.log(url);
        return this.http.get<any>(urls);
    }
    
    downloadFile(data: any) {
        const blob = new Blob([data], { type: 'application/x-zip' });
        const url= window.URL.createObjectURL(blob);
        window.open(url);
      }

    browse(file: FileInfo) {
        this.getData(file.Id).subscribe((result) => {
            console.info('urlDownload file from google drive: ' + result.webContentLink);
            // var files = new File(result, "hello world.twdx", {type: "application/x-zip"});
            // FileSaver.saveAs(files);
            // console.log(files);
        });
        // console.info(gapi.client.drive.files.get({
        //     fileId: '1Ej-spz73FX0Fqi1nXAiMh6nHAr06LzGW'
        // }))
        
    }

    ngOnInit(): void {
        this.fileRepository.getFiles("root")
            .then((res) => {
                this.zone.run(() => {
                    this.files = res;
                    this.dataSource.data = this.files;
                });
            });
    }

    signOut() {
        this.gapiSession.signOut();
        this.dataSource = new MatTableDataSource(null);    
    }
}