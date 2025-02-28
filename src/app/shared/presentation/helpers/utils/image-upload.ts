import { ImageValidation } from "src/app/shared/domain/constants/imageValidation.const";
import { IImageFile, ImageFile } from "src/app/shared/domain/entities/image-files";
import { ImageList } from "src/app/shared/domain/entities/image-list";

export class ImageUpload {
    public static upload(event: any,){
        const reader = new FileReader();
        const maxSize = 20000;
        const rawImage: any = new Image();
        const  errorMessage : string = '';
        return new Promise(resolve =>{
    
          if(event.target.files && event.target.files.length){
            if (event.target.files[0].size > maxSize) {
             const  errorMessage = 'El tamaño de la imagen es mayor a 2 MB.';
              throw new Error(errorMessage);
            }
          }
    
          const [file] = event.target.files;
          rawImage.file = file;
          reader.readAsDataURL(file);
          reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            rawImage.preview = reader.result as string;
            image.onerror = (e: any)=>{
              throw new Error(e);
            };
    
          };
          if(errorMessage != ''){
            throw new Error(errorMessage);
          }
        });
      }

      public static renderImage(files: FileList, maxImage: number): Promise<ImageList> {
        const maxSize = ImageValidation.productImage.maxSize;
        const imageList = new ImageList();
        
        return new Promise((resolve, reject) => {
          try {
            if (!files || !files.length) {
              resolve(imageList);
              return;
            }

  
        
            const numberOfFiles = files.length;
            if (numberOfFiles > maxImage) {
              reject(`Solo se permiten ${maxImage} imágenes`);
              return;
            }
            let processedFiles = 0;
  
         
            for (let i = 0; i < numberOfFiles; i++) {
              if (files[i].size > maxSize) {
                imageList.errors.push('El tamaño máximo permitido es 2 MB.');
                processedFiles++;
                continue;
              }
              
        
              const reader = new FileReader();
              let image: IImageFile;
        
              reader.onload = (e: any) => {
                image = new ImageFile(
                  e.target.result,
                  e.target.result,
                  files[i],
                );
        
                imageList.images.push(image);
                processedFiles++;
        
                if (processedFiles === numberOfFiles) {
                  resolve(imageList);
                }
              };
        
              reader.readAsDataURL(files[i]);
            }
          } catch (error: any) {
            reject(new Error(error));
          }
        });
      }
}
