import { Component, ElementRef, ViewChild } from '@angular/core';
import { SelectEvent } from '@progress/kendo-angular-layout';
import { FileRestrictions } from "@progress/kendo-angular-upload";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'video_app';
  public value = `
        <p>
            The Kendo UI Angular Editor allows your users to edit HTML in a familiar, user-friendly way.<br />
            In this version, the Editor provides the core HTML editing engine which includes basic text formatting, hyperlinks, and lists.
            The widget <strong>outputs identical HTML</strong> across all major browsers, follows
            accessibility standards, and provides API for content manipulation.
        </p>
        <div style="display: inline-block; width: 39%;">
            <p>Features include:</p>
            <ul>
                <li>Text formatting</li>
                <li>Bulleted and numbered lists</li>
                <li>Hyperlinks</li>
                <li>Cross-browser support</li>
                <li>Identical HTML output across browsers</li>
                <li>Inserting and resizing images</li>
            </ul>
        </div>
        <div style="display: inline-block; width: 60%; vertical-align: top;">
            <img src="https://demos.telerik.com/kendo-ui/content/web/editor/tenerife.png" width="100%" style="min-width: 10px; min-height: 10px;" alt="Tenerife" />
        </div>
    `;

    fileContent = `hi there`;
    down='ok';


  fileUrl : SafeResourceUrl= 'http://localhost/pdf_viewer-master/18/docs/pdf.pdf';
  constructor(private sanitizer: DomSanitizer) {  }

  public onChange(e: any) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsText(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.fileContent=event.target.result;
        const data = this.fileContent;
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    console.log(data)
      }
    }
    console.log(this.down)
  }

  public onRemove(e: any): void {
    this.fileContent='';
  }

  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public onError(e: ErrorEvent): void {
    debugger;
    console.log(e);
  }

  public onComplete(e:any) {
    debugger;
    console.log();
  }

  public onSelect(e: SelectEvent): void {
    console.log("on select")
  }


  time = 'Timestamp here...';

  @ViewChild("videoPlayer", { static: false }) videoplayer: ElementRef | any;
  isPlay: boolean = false;
  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();

  }
  playPause() {
    var myVideo: any = document.getElementById("my_video_1");
    if (myVideo.paused) myVideo.play();
    else myVideo.pause();
    console.log(new Date(myVideo.currentTime * 1000).toISOString().slice(11, 19));
    this.time =new Date(myVideo.currentTime * 1000).toISOString().slice(11, 19);
  }

  makeBig() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 560;
    this.time =new Date(myVideo.currentTime * 1000).toISOString().slice(11, 19);
  }

  makeSmall() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 320;
    this.time =new Date(myVideo.currentTime * 1000).toISOString().slice(11, 19);
  }

  makeNormal() {
    var myVideo: any = document.getElementById("my_video_1");
    myVideo.width = 420;
    this.time =new Date(myVideo.currentTime * 1000).toISOString().slice(11, 19);
  }

  skip(value:any) {
    let video: any = document.getElementById("my_video_1");
    video.currentTime += value;
    this.time =new Date(video.currentTime * 1000).toISOString().slice(11, 19);
  }

  restart() {
    let video: any = document.getElementById("my_video_1");
    video.currentTime = 0;
    this.time =new Date(video.currentTime * 1000).toISOString().slice(11, 19);


  }




}
