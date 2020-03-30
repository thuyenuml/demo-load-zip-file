import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  xmlDoc: Document;

  constructor(public dataService: DataService) { }

  ngOnInit() { 
    this.dataService.myMethod$.subscribe((xmlString) => {
      this.xmlDoc = this.dataService.parseXmlDoc(xmlString);
      console.info(this.xmlDoc);
    });
  }
}
