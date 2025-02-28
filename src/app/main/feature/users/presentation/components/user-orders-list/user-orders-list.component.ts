import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OrganismsModule, AtomModule, MoleculesModule } from '@sitec/sarao';
import { OrderDataRow } from 'src/app/main/feature/orders/domain/entities/data-row-entities/orders.data-row';
import { OrderFromListEntity } from 'src/app/main/feature/orders/domain/entities/order.entity';
import { ListOrdersUseCase } from 'src/app/main/feature/orders/domain/usecases/list-orders.usecase';
import { OrderDataModule } from 'src/app/main/feature/orders/infrastructure/modules/order.data.module';
import { OrderModalComponent } from 'src/app/main/feature/orders/presentation/components/order-modal/order-modal.component';
import { DataOptions, SortOrder, FilterParameters, Filter } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { TableHeadEntity, TableHeadChipEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';

@Component({
  selector: 'user-orders-list',
  standalone: true,
  imports: [
    CommonModule,
    OrderDataModule,
    SectionTitleComponent,
    SectionSubtitleComponent,
    OrganismsModule,
    AtomModule,
    MoleculesModule,
    JichiTableComponent,
    OrderModalComponent
  ],
  templateUrl: './user-orders-list.component.html',
  styleUrls: ['./user-orders-list.component.scss']
})
export class UserOrdersListComponent {
  @Input() userAuth0Id!: string;
  @Output() ordersLoaded = new EventEmitter<Array<OrderFromListEntity>>();

  ordersListHead: TableHeadEntity[] = [
    {name: 'Código', prop: 'orderCode', type: 'number'},
    {name: 'Total', prop: 'total', type: 'number'},
    {name: 'Fecha', prop: 'createdAt', type: 'dateTime'},
    new TableHeadChipEntity({name: 'Pagada', prop: 'isPaid', type: 'chip', trueLabel: 'Pagada', falseLabel: 'No pagada' }),
    new TableHeadChipEntity({name: 'Entregada', prop: 'isDelivered', type: 'chip', trueLabel: 'Entregada', falseLabel: 'No entregada' }),
    new TableHeadChipEntity({name: 'Anulada', prop: 'isNullified', type: 'chip', trueLabel: 'Anulada', falseLabel: 'Vigente' }),
    {name: '', prop: 'actions', type: 'actions'}
  ]
  ordersListCurrentPage: number = 1;
  ordersListPageSize: number = 10;
  ordersResponse!: PagedResponse<OrderFromListEntity>;
  ordersDataRow : OrderDataRow[] = [];
  orders: Array<OrderFromListEntity> = [];
  ordersListDataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 9999999,
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
  orderModalIsOpen = false;
  selectedOrder?: OrderFromListEntity;

  constructor(
    private listOrdersUseCase: ListOrdersUseCase,
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }
  
  changeOrdersListPage(page: number): void{
    this.ordersListCurrentPage = page;
    this.ordersListDataOptions.paginationOptions.pageNumber = this.ordersListCurrentPage
    this.loadOrders()
  }

  loadOrders(){
    if (this.ordersResponse) {
      const skip = (this.ordersListCurrentPage - 1) * this.ordersListPageSize;
      const end = this.ordersListCurrentPage * this.ordersListPageSize;
      const filteredOrders = this.ordersResponse.result.slice(skip, end);
      this.orders = filteredOrders;
      this.ordersDataRow = []
      
      this.ordersResponse.result.map((data)=>{
       this.ordersDataRow.push(data.convertToDataRow())
      })
      return;
    }
    this.ordersListDataOptions.FilterOptions = [
        new FilterParameters({
          field: 'CreatedBy',
          operation: Filter.Equal,
          value: this.userAuth0Id,
        }
      )
    ]
    this.listOrdersUseCase
    .execute(this.ordersListDataOptions)
    .subscribe({
      next: (resp) =>{
        this.ordersResponse = resp;
        this.ordersLoaded.emit(resp.result);
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

  viewOrder(orderId: number) {
    console.log(orderId)
    this.selectedOrder = this.orders.find((order) => order.id === orderId);
    this.openSideBarDrawer();
  }
  openSideBarDrawer(){
    this.orderModalIsOpen = true
  }

  handleOrderHasBeenUpdated() {
    this.loadOrders()
  }

  handleOrderModalIsOpenChange(isOpen: boolean) {
    if (!isOpen) {
      this.selectedOrder = undefined;
    }
  }
}
