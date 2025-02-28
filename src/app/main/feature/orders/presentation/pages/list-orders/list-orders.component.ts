import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceComponent } from 'src/app/shared/presentation/components/print-layout/invoice/invoice.component';
import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { OrderGateway } from '../../../domain/gateways/order.gateway';
import { OrderDataModule } from '../../../infrastructure/modules/order.data.module';
import { FormsModule } from '@angular/forms';
import { MoleculesModule, AtomModule } from '@sitec/sarao';
import { ProductDataModule } from 'src/app/main/feature/products/infrastructure/modules/product.data.module';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { SidebarDrawerComponent } from 'src/app/shared/presentation/components/sidebar-drawer/sidebar-drawer.component';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';
import { ProductsListForOrderCreationComponent } from '../../components/products-list-for-order-creation/products-list-for-order-creation.component';
import { TableHeadChipEntity, TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { OrderDataRow } from '../../../domain/entities/data-row-entities/orders.data-row';
import { DataOptions, Filter, FilterParameters, SortOrder } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { OrderModalComponent } from '../../components/order-modal/order-modal.component';
import { ListOrdersUseCase } from '../../../domain/usecases/list-orders.usecase';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MoleculesModule,
    AtomModule,
    OrderDataModule,
    ProductDataModule,
    JichiTableComponent,
    SectionSubtitleComponent,
    SpanComponent,
    AddButtonComponent,
    SidebarDrawerComponent,
    ProductsListForOrderCreationComponent,
    FormsModule,
    OrderModalComponent,
    InvoiceComponent,
    SectionTitleComponent
  ],
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})
export class ListOrdersComponent implements OnInit {
  head: TableHeadEntity[] = [
    {name: 'Código', prop: 'orderCode', type: 'number'},
    {name: 'Cliente', prop: 'customerName', type: 'text'},
    {name: 'Total', prop: 'total', type: 'number'},
    {name: 'Fecha', prop: 'createdAt', type: 'dateTime'},
    new TableHeadChipEntity({name: 'Pagada', prop: 'isPaid', type: 'chip', trueLabel: 'Pagada', falseLabel: 'No pagada' }),
    new TableHeadChipEntity({name: 'Entregada', prop: 'isDelivered', type: 'chip', trueLabel: 'Entregada', falseLabel: 'No entregada' }),
    new TableHeadChipEntity({name: 'Anulada', prop: 'isNullified', type: 'chip', trueLabel: 'Anulada', falseLabel: 'Vigente' }),
    {name: '', prop: 'actions', type: 'actions'}

    // {name: 'Cantidad disponible', prop: 'quantity', type: 'text'},
    // {name: 'Precio', prop: 'price', type: 'price'},
    // {name: 'Acciones', prop: 'actions', type: 'actions'}
  ]

  orderModalIsOpen = false;
  currentPage: number = 1;
  pageSize: number = 10;
  ordersResponse!: PagedResponse<OrderFromListEntity>;
  ordersDataRow : OrderDataRow[] = []
  dataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 10,
      pageNumber: 1
    },
    sortOptions: [
      {
        field: 'Id',
        direction: SortOrder.Descending
      }
    ],
    FilterOptions: []
  }
  selectedOrder?: OrderFromListEntity
  orders: Array<OrderFromListEntity> = [];
  constructor(private orderService: OrderGateway, private listOrdersUseCase: ListOrdersUseCase) {

  }

  ngOnInit(){
    this.loadOrders()
  }

  changePage(page: number): void{
    this.currentPage = page;
    this.dataOptions.paginationOptions.pageNumber = this.currentPage
    this.loadOrders()
  }

  loadOrders(){
    this.listOrdersUseCase
    .execute(this.dataOptions)
    .subscribe({
      next: (resp) =>{
        this.ordersResponse = resp;
        this.orders = resp.result;
        this.ordersDataRow = []
        
        this.ordersResponse.result.map((data)=>{
         this.ordersDataRow.push(data.convertToDataRow())
        })
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }

  handleOrderHasBeenUpdated() {
    this.loadOrders()
  }

  filterByOrderCode(event: any) {
    const orderCode = event.target.value;
    let filters = new Array<FilterParameters>();
    if (orderCode) {
      filters.push(
        new FilterParameters({
            field: 'OrderCode',
            operation: Filter.Equal,
            value: orderCode,
          })
      )
    }
    this.dataOptions.FilterOptions = filters
    this.loadOrders()
  }

  handleOrderModalIsOpenChange(isOpen: boolean) {
    if (!isOpen) {
      this.selectedOrder = undefined;
    }
  }

  viewOrder(orderId: number) {
    console.log(orderId)
    this.selectedOrder = this.orders.find((order) => order.id === orderId);
    this.openSideBarDrawer();
  }

  openSideBarDrawer(){
    this.orderModalIsOpen = true
  }

  closeSideBarDrawer(){
    this.orderModalIsOpen = false
  }
}
