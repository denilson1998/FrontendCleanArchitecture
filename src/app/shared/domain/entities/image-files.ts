export class ImageFile {
    original: string; 
    cropped: string ;
    file: File ;
    validation: boolean;
    
    constructor( original: string, cropped: string, file: File) {
        this.original = original;
        this.cropped = cropped;
        this.file = file;
        this.validation = false;
      }
}

export interface IImageFile {
    original: string;
    cropped: string;
    file: File;
    validation: boolean;
  }