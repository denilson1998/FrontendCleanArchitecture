import { Directive, ElementRef, EventEmitter, Output, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDragndrop]',
  standalone: true
})
export class DragndropDirective {

  constructor() { }

  @HostBinding('class.fileover')
  fileOver: boolean = false;
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener ('dragover', ['$event']) 
  onDragOver(event: Event){
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }


  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: Event){
    event.preventDefault();
    event.stopPropagation();

  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any){
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    let files = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

}
