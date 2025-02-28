import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'jichi-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-button.component.html',
})
export class AddButtonComponent {
  @Input() label: string = '';
  @Input() disable : boolean = false;
  @Input() type : string = ''
  @Output() onClick = new EventEmitter<any>();


  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
