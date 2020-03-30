import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let w, h, root;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private myMethodSubject = new Subject<any>();
  myMethod$ = this.myMethodSubject.asObservable();
  constructor() { 
   }
  
  myMethod(data) {
    // console.log(data);
    this.myMethodSubject.next(data);
  }

  parseXmlDoc(xmlString) {
    let parser = new DOMParser();
      return parser.parseFromString(xmlString, 'text/xml');
  }

  parseXml(data) {
      function xmlToJson(xml) {
        let obj = {};
        if (xml.nodeType == 1) {
          if (xml.attributes.length > 0) {
            obj["attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
              let attribute = xml.attributes.item(j);
              obj["attributes"][attribute.nodeName] = attribute.nodeValue;
            }
          }
        } else if (xml.nodeType == 3) {
          obj = xml.nodeValue;
        }
        if (xml.hasChildNodes()) {
          for (let i = 0; i < xml.childNodes.length; i++) {
            let item = xml.childNodes.item(i);
            let nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
              obj[nodeName] = xmlToJson(item);
            } else {
              if (typeof (obj[nodeName].push) == "undefined") {
                let old = obj[nodeName];
                obj[nodeName] = [];
                obj[nodeName].push(old);
              }
              obj[nodeName].push(xmlToJson(item));
            }
          }
        }
        return obj;
      };
      function parseData(json) {
        let node = [];
        for (var prop in json) {
          node[prop] = [];
          for (var key in json[prop]) {
            node[prop][key] = json[prop][key]
          }
        }
        return node;
      }
      if (data.hasChildNodes()) {
        let mindmap = data.children.item(0);
        if (mindmap.hasChildNodes()) {
          let js = xmlToJson(mindmap);
          root = parseData(js);
          // console.info('root:', root)
          root.x0 = h / 2;
          root.y0 = w / 2;
        }
      } 
      return root;    
  }
}
