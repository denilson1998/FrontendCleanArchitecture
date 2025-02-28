import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AtomModule, MoleculesModule } from '@sitec/sarao';
import { DragndropDirective } from '../../../helpers/directives/dragndrop.directive';
import { AddButtonComponent } from '../../buttons/add-button/add-button.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  standalone: true,
  imports: [CommonModule, AtomModule, MoleculesModule, DragndropDirective, AddButtonComponent, ImageCropperModule],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent {
  @Input() state: boolean = false;
  @Input() format: string = 'image/*';

  onFileDropped($event: any) {
    console.log($event)
  }

  fileBrowserHandler(event: any){
   }
 
}
