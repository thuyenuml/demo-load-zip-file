import { Injectable } from "@angular/core";
import { FileInfo, MIME_TYPE_FOLDER } from "../../models/fileInfo";
declare var UploaderForGoogleDrive;
declare var gapi : any;

@Injectable()
export class FileRepository {

    getFiles(folderId: string) {
        // console.info(gapi.client.drive.files);
        return gapi.client.drive.files.list({
            pageSize: 100,
            fields: "nextPageToken, files(id, name, mimeType, modifiedTime, size)",
            q: `'${folderId}' in parents and trashed = false`
        }).then((res) => {
            let files: FileInfo[] = [];
            res.result.files.forEach((file) => files.push(FileInfo.fromGoogleFile(file)));
            // let files: File[] = [];
            // res.result.files.forEach((file) => files.push(file));
            // console.info(files);
            // console.info(gapi.client.drive.files[0].fields);
            return files;
        });
    }
}