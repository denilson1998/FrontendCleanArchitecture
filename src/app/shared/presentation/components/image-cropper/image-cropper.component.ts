import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AtomModule, MoleculesModule } from '@sitec/sarao';
import { Dimensions, ImageCroppedEvent, ImageCropperModule, base64ToFile } from 'ngx-image-cropper';

@Component({
  selector: 'jichi-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
  standalone: true,
  imports: [CommonModule, MoleculesModule, ImageCropperModule, AtomModule]
})
export class JichiImageCropperComponent implements OnInit {

  @Input() state: boolean = false;
  @Input() imageEvent: any = null;

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>;
  croppedImage: any;
  showCropper: boolean = false;
  imagePreview:any = null

  ngOnInit(): void {
    this.imagePreview = this.imageEvent;
  }


  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      this.showCropper = true;
  }




  updateRangeSlider(slider: any) {
    const value = (slider.value - slider.min) / (slider.max - slider.min);
    const percent = value * 100;
    const color = `linear-gradient(90deg, #4F46E5 ${percent}%, #ccc ${percent}%)`;
    slider.style.backgroundImage = color;
  }


  closeCropper(){
    this.state = false;
    this.imagePreview = null
    this.onClose.emit(null)
  }

  saveImage(){
    this.onClose.emit(this.croppedImage)
  }




}
