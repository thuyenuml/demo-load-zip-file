import { Component, NgZone, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FileInfo } from "../../models/fileInfo";
import { FileRepository } from 'src/infrastructure/repositories/file.repository';
import { GapiSession } from 'src/infrastructure/sessions/gapi.session';
import { DataService } from 'src/services/data.service';
import * as JSZip from 'jszip';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
declare const Buffer;
declare var require: any;

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
    
    getData(): Observable<File[]> {     
        return this.http.get<File[]>('https://www.googleapis.com/drive/v3/files/1Ej-spz73FX0Fqi1nXAiMh6nHAr06LzGW?supportsAllDrives=true&fields=*&key=AIzaSyD0kEHkCoCf4xAwf7xqvMhL8mkGYRhT_Sk&alt=media');
    }
    
    browse(file: FileInfo) {
        this.getData().subscribe(result => {console.info(result)});
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