import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganismsModule, AtomModule, MoleculesModule } from '@sitec/sarao';
import { DataOptions, SortOrder } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { TableHeadEntity } from 'src/app/shared/domain/entities/table-head.entity';
import { AddButtonComponent } from 'src/app/shared/presentation/components/buttons/add-button/add-button.component';
import { JichiTableComponent } from 'src/app/shared/presentation/components/table/table.component';
import { SectionTitleComponent } from 'src/app/shared/presentation/components/texts/section-title/section-title.component';
import { SpanComponent } from 'src/app/shared/presentation/components/texts/span/span.component';
import { SectionSubtitleComponent } from 'src/app/shared/presentation/components/texts/subtitle-section/section-subtitle.component';
import { CustomerBaseEntity, CustomerEntity, CustomerFromListEntity } from '../../../domain/entities/customer.entity';
import { CustomerDataRow } from '../../../domain/entities/data-row-entities/customers.data-row';
import { AddCustomerUseCase } from '../../../domain/usecases/add-customer.usecase';
import { ListCustomersUseCase } from '../../../domain/usecases/list-customers.usecase';
import { CustomerDataModule } from '../../../infrastructure/modules/customer.data.module';
import { CreateCustomerModalComponent } from '../../components/create-customer-modal/create-customer-modal.component';
import { EditCustomerModalComponent } from '../../components/edit-customer-modal/edit-customer-modal.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    OrganismsModule,
    CustomerDataModule,
    AtomModule,
    JichiTableComponent,
    SpanComponent,
    SectionSubtitleComponent,
    AddButtonComponent,
    MoleculesModule,
    CreateCustomerModalComponent,
    EditCustomerModalComponent,
    SectionTitleComponent

  ],
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  pagedCustomers?: PagedResponse<CustomerFromListEntity>
  customers: Array<CustomerBaseEntity> = [];
  dataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 30,
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
  isLoading = false;

  customersDataRow : CustomerDataRow[] = []
  currentPage: number = 1;
  pageSize: number = 10;
  createCustomerModalIsShown = false;
  editCustomerModalIsShown = false;
  selectedCustomer?: CustomerBaseEntity;

  organizationHasNoProducts?: boolean;

  head: TableHeadEntity[] = [
    // {name: 'id', prop: 'id', type: 'number'},
    {name: 'Nombre completo', prop: 'fullName', type: 'text'},
    {name: 'Número de celular', prop: 'phoneNumber', type: 'text'},
    {name: 'Correo electrónico', prop: 'email', type: 'text'},
    {name: 'Dirección de domicilio', prop: 'location', type: 'text'},
    {name: 'Acciones', prop: 'actions', type: 'actions'}
  ]
  constructor(
    private listCustomersUseCase: ListCustomersUseCase,
    private router: Router
  ) {
    this.loadCustomers({reset: true});
  }

  goToCustomerPage(customerId: number) {
    this.router.navigateByUrl(`/customers/${customerId}`)
  }
  showCreateCustomerModal() {
    this.selectedCustomer = undefined;
    this.editCustomerModalIsShown = false;
    this.createCustomerModalIsShown = true;
  }

  showEditCustomerModal(customerId: number) {
    this.selectedCustomer = this.customers.find(c => c.id == customerId);
    this.createCustomerModalIsShown = false;
    this.editCustomerModalIsShown = true;
  }
  
  changePage(page: number): void{
    this.currentPage = page;
    this.dataOptions.paginationOptions.pageNumber = this.currentPage
    this.loadCustomers()
  }

  loadCustomers(options: {reset: boolean} = {reset: false}){
    if (!options.reset && this.pagedCustomers != undefined && this.pagedCustomers.totalRecords <= this.customers.length) {
      return;
    }

    if (options.reset) {
      this.dataOptions = {
        paginationOptions: {
          pageSize: 30,
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
    }
    this.isLoading = true;
    this.listCustomersUseCase
    .execute(this.dataOptions)
    .subscribe({
      next: (resp) =>{
        this.pagedCustomers = resp;
        this.customers = resp.result;
        this.customersDataRow = []
        
        this.pagedCustomers.result.map((data)=>{
         this.customersDataRow.push(data.convertToDataRow())
        })
        if (this.pagedCustomers.totalRecords === 0) {
          this.organizationHasNoProducts = true;
        }
        this.isLoading = false;
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }

  handleCustomerCreatedOrEdited(customer: CustomerEntity) {
    this.loadCustomers({reset: true});
    this.createCustomerModalIsShown = false;
  }

}
