import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ImageSnippet} from '../image-snippet';
import {ImageService} from './image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() profile: any;
  @Input('type') profileType: string;

  selectedFile: ImageSnippet;

  @Output() uploadedUrl = new EventEmitter<string>();

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
  }

  private onSuccess(res) {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.selectedFile.src = res.src;
    this.uploadedUrl.emit(this.selectedFile.src);
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any, profile: any, profileType: string) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file, profile, profileType).subscribe(
        (res) => {
          this.onSuccess(res);
        },
        (err) => {
          this.onError();
        });
    });

    reader.readAsDataURL(file);
  }

  openFileUpload() {
    document.getElementById('imageLabel').click();
  }
}
