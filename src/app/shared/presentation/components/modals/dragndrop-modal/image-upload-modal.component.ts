import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { AtomModule, MoleculesModule } from '@sitec/sarao';
import { DragndropDirective } from '../../../helpers/directives/dragndrop.directive';
import { AddButtonComponent } from '../../buttons/add-button/add-button.component';
import { ImageUpload } from '../../../helpers/utils/image-upload';
import { ImageList } from 'src/app/shared/domain/entities/image-list';
import { ImageCroppedEvent, ImageCropperComponent, ImageCropperModule } from 'ngx-image-cropper';
import { IImageFile, ImageFile } from 'src/app/shared/domain/entities/image-files';
import { NgOptimizedImage } from '@angular/common'

import { ImageValidation } from 'src/app/shared/domain/constants/imageValidation.const';
@Component({
  selector: 'jichi-image-upload',
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, AtomModule, MoleculesModule, DragndropDirective, AddButtonComponent, ImageCropperModule],
  encapsulation: ViewEncapsulation.None
})
export class ImageUploadModal {
  @Input() state: boolean = false;
  @Input() format: string = 'image/*';
  @Output() imageUploaded  = new EventEmitter<any>
  @ViewChild(ImageCropperComponent)
  imageCropper!: ImageCropperComponent;
  files: any[] = [];
  imgList:ImageList = new ImageList();
  croppedImage: any;
  showCropper: boolean = false;
  selectedImage: IImageFile = new ImageFile('', '', new File([], ''))
  galleryActive: boolean = false;
  currentIndex : number = 0 ;

  errorMessage: string = ''
  imageValidation = ImageValidation.productImage;

  fileBrowserHandler(event: any){
   this.prepareFilesList(event.target.files)
  }


  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  newFileDrop($event: any){
    this.errorMessage = '';
    const availableImageSlots = this.imageValidation.maxImageQuantity - this.imgList.images.length 
      if($event.length > availableImageSlots){
          this.errorMessage = 'Solo se permiten '+this.imageValidation.maxImageQuantity+' imágenes'
      }else{
        ImageUpload.renderImage($event,this.imageValidation.maxImageQuantity)
        .then((imageList: ImageList) => {
          this.imgList.images.push(...imageList.images)
          this.imgList.errors.push(...imageList.errors)
          this.selectedImage = this.imgList.images[this.imgList.images.length -1]
          this.currentIndex =  this.imgList.images.length -1
        })
        .catch((error) => {
        });
        this.galleryActive = false;
      }
  }

  newFileHandler($event: any){
    this.newFileDrop($event?.target.files)
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectedImage.cropped = '';
    this.croppedImage = event.base64;

    this.selectedImage.cropped = this.croppedImage
    this.selectedImage.validation = true
  }

  imageLoaded() {
    this.selectedImage.cropped = '';
    this.showCropper = true;
    
  }

  deleteImage( index: number){
    this.imgList.images.splice(index,1);
  }

  editImage(index: number){
    this.currentIndex = index;
    this.galleryActive = false;
  }

  changeImage(image: ImageFile, index: number){
    this.showCropper = false
    this.selectedImage = image
    this.imageCropper.imageBase64 = this.selectedImage.original
    this.showCropper = true;
    this.currentIndex = index
    this.imageCropper.crop();
    image.validation = true;
  }



 async prepareFilesList(files: any) {
      ImageUpload.renderImage(files, this.imageValidation.maxImageQuantity)
      .then((imageList: ImageList) => {
        this.imgList = imageList
        this.selectedImage = this.imgList.images[0]
      })
      .catch((error) => {
      });
  }


  continue(){
    try {
      this.errorMessage = ''
      for (let i = 0; i < this.imgList.images.length; i++) {
        this.imageCropper.imageBase64 = this.imgList.images[i].cropped
      if(this.imgList.images[i].validation === false){
        throw new Error('No todas las imagenes estan recortadas. Asegurate de recortas tus imagenes')
      }
        const imageName = this.generateName(10)
        const imageBlob = this.dataURItoBlob(this.imgList.images[i].cropped);
        const imageFile = new File([imageBlob], imageName, { type: 'image/png' });
        this.imgList.images[i].file = imageFile
      }
        this.galleryActive = true;
        console.log(this.galleryActive)
    } catch (error: any) {
      console.log(error)
      this.errorMessage = error
    }
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  generateName(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

  saveImages(){
    this.imageUploaded.emit(this.imgList.images)
    this.state = false;
  }


}


