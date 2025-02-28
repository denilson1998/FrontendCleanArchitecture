import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class InvoiceComponent {
  @Input() data!: OrderFromListEntity;
}
