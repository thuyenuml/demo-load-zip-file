import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';
declare var OneDrive: any;

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me/drive/root/children';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile;

  constructor(private authService: MsalService, private http: HttpClient) { }

  ngOnInit() {
    this.getProfile();
    this.authService.acquireTokenPopup({scopes: ["user.read"]});
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
        console.info(this.profile);
      });
  }

  launchOneDrivePicker() {
    var odOptions = {
      clientId: "6226576d-37e9-49eb-b201-ec1eeb0029b6",
      action: "query",
      multiSelect: false,
      // scopes: "user.read files.read files.read.all sites.read.all",
      advanced: {
        queryParameters: "select=id,@microsoft.graph.downloadUrl",
        filter: "folder,.twdx" /* display folder and files with extension '.twdx' only */
      },
      success: function(files) {
        // this.http.get("https://graph.microsoft.com/v1.0/drives/2EFF7DE5E78D948A/items/2EFF7DE5E78D948A!104").subscribe(result => {console.info(result)});
        console.info('url download file from Onedrive: ' + Object.values(files.value[0])[1]);
        // FileSaver.saveAs(Object.values(files.value[0])[1]);
      },
      cancel: function() { /* cancel handler */ },
      error: function(error) { /* error handler */ }
    }
    OneDrive.open(odOptions);  
}

}
