import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icons } from 'src/app/shared/domain/constants/icons.const';

@Component({
  selector: 'jichi-modal-button',
  templateUrl: './modal-button.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ModalButtonComponent implements OnInit {

  @Input() label: string = '';
  @Input() icon: string = ''
  @Output() onClick = new EventEmitter<any>();

  ngOnInit(): void {
    if(this.icon != '' ){
      this.icon = Icons[this.icon];
    }
  }

  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
