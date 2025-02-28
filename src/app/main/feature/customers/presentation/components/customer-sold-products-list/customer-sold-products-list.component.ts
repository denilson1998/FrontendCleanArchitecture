import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';

@Component({
  selector: 'customer-sold-products-list',
  standalone: true,
  imports: [
    CommonModule,
    JichiTableComponent,
    SectionSubtitleComponent
  ],
  templateUrl: './customer-sold-products-list.component.html',
  styleUrls: ['./customer-sold-products-list.component.scss']
})
export class CustomerSoldProductsListComponent implements OnInit {
  @Input() orders: Array<OrderFromListEntity> = [];
  
  listHead: TableHeadEntity[] = [
    {name: 'Producto', prop: 'name', type: 'text'},
    {name: 'Total', prop: 'totalQuantity', type: 'number'},
    {name: 'Pagados', prop: 'paidQuantity', type: 'number'},
    {name: 'Entregados', prop: 'deliveredQuantity', type: 'number'}
  ]
  pageNumber: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  soldProductsList: Array<SoldProductsList> = [];
  dataRow?: Array<SoldProductsList>;

  ngOnInit(): void {
    this.orders.forEach((order) => {
      order.orderItems.forEach((product) => {
          const productIndex = this.soldProductsList.findIndex((soldProduct) => soldProduct.name === product.productName);
          if (productIndex === -1) {
            this.soldProductsList.push({
              name: product.productName,
              totalQuantity: product.quantity,
              paidQuantity: product.quantity,
              deliveredQuantity: product.quantity,
            });
          } else {
            if (order.isPaid) {
              this.soldProductsList[productIndex].paidQuantity += product.quantity;
            }

            if (order.isDelivered) {
              this.soldProductsList[productIndex].deliveredQuantity += product.quantity;
            }

            this.soldProductsList[productIndex].totalQuantity += product.quantity;
          }
      });
    });
    console.table(this.soldProductsList)
    this.totalPages = Math.ceil(this.soldProductsList.length / this.pageSize);
    this.loadList();
  }

  changePage(page: number) {
    this.pageNumber = page;
    this.loadList();
  }

  loadList() {
    this.dataRow = this.soldProductsList.slice((this.pageNumber - 1) * this.pageSize, this.pageNumber * this.pageSize);
  }


}

interface SoldProductsList {
  name: string;
  totalQuantity: number;
  paidQuantity: number;
  deliveredQuantity: number;
}
