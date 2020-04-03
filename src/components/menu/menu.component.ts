import * as JSZip from 'jszip';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  xmlDoc: Document;
  zip: JSZip;
  dataZipEntry: string[];
  constructor(private dataService: DataService
    ) {
    this.zip = new JSZip();
  }
  ngOnInit() {
  }
  onChange(file: File): any {
    console.info('file : ' , file.name);
    JSZip.loadAsync(file)
      .then(zip => {
        console.info(zip);
        zip.forEach((relativePath, zipEntry) => {
          if (zipEntry.name.endsWith(".xml")) {
            zipEntry.async('string').then(data => {
              this.dataService.myMethod(data);
            });
          }
        });
      });
  }

}
