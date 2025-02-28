import { CommonModule } from '@angular/common';
import { Component, Input, isStandalone } from '@angular/core';
import { InvoiceComponent } from '../../print-layout/invoice/invoice.component';

@Component({
  selector: 'app-modal-print',
  templateUrl: './modal-print.component.html',
  styleUrls: ['./modal-print.component.scss'],
  standalone: true,
  imports: [CommonModule, InvoiceComponent],
})
export class ModalPrintComponent {
  showModal = false;
  @Input() type: string = '';
  @Input() data: string = '';

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  setPrint() {
    window.print();
  }
}
