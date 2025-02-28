import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtomModule, OrganismsModule } from '@sitec/sarao';
import { CustomerEntity, CustomerFromListEntity } from 'src/app/main/feature/customers/domain/entities/customer.entity';
import { ListCustomersUseCase } from 'src/app/main/feature/customers/domain/usecases/list-customers.usecase';
import { AddCustomerUseCase } from 'src/app/main/feature/customers/domain/usecases/add-customer.usecase';
import { CustomerDataModule } from 'src/app/main/feature/customers/infrastructure/modules/customer.data.module';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { CreateCustomerDto } from 'src/app/main/feature/customers/domain/dtos/create-customer.dto';

@Component({
  selector: 'customers-list-for-selection',
  standalone: true,
  imports: [
    CommonModule,
    OrganismsModule,
    CustomerDataModule,
    ReactiveFormsModule,
    AtomModule
  ],
  templateUrl: './customers-list-for-selection.component.html',
  styleUrls: ['./customers-list-for-selection.component.scss']
})
export class CustomersListForSelectionComponent {
  @Output() selectedCustomersChange = new EventEmitter<Array<CustomerEntity>>();
  @Input() multipleSelection = false;
  @Input() showCreateClientForm = false;

  formGroup = this.fb.group({
    name: [null, Validators.required],
    phoneNumber: [null],
    email: [null, Validators.email],
    location: [null],
  })

  pagedCustomers?: PagedResponse<CustomerFromListEntity>
  customers: Array<CustomerFromListEntity> = [];
  dataOptions: DataOptions = {
    paginationOptions: {
      pageSize: 30,
      pageNumber: 1
    },
    sortOptions: [],
    FilterOptions: []
  }
  isLoading = false;

  selectedCustomers: Array<CustomerEntity> = [];


  constructor(
    private fb: FormBuilder,
    private listCustomersUseCase: ListCustomersUseCase,
    private addCustomerUseCase: AddCustomerUseCase,
  ) {
    this.loadCustomers({reset: true});
  }

  customerSelected(event: any, customer: CustomerEntity){
    if(event.target.checked){
      if (this.multipleSelection) {
        this.selectedCustomers.push(customer);
      } else {
        this.selectedCustomers = [customer];
      }
    } else {
      this.selectedCustomers = this.selectedCustomers.filter(c => c.id !== customer.id);
    }
    this.selectedCustomersChange.emit(this.selectedCustomers);
  }

  createClient() {
    if (!this.formGroup.valid) {
      return;
    }

    let createCustomerDto = new CreateCustomerDto(
      this.formGroup.value.name!,
      this.formGroup.value.phoneNumber ?? undefined,
      this.formGroup.value.email ?? undefined,
      this.formGroup.value.location ?? undefined
    )
    this.addCustomerUseCase
    .execute(createCustomerDto)
    .subscribe({
      next: resp =>{
        if (!this.multipleSelection) {
          this.selectedCustomers = [];
        }
        this.selectedCustomers.push(resp);
        this.selectedCustomersChange.emit(this.selectedCustomers);
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }
  
  loadCustomers(options: {reset: boolean} = {reset: false}){
    if (this.pagedCustomers != undefined && this.pagedCustomers.totalRecords <= this.customers.length) {
      return;
    }
    this.dataOptions.paginationOptions.pageNumber++;

    if (options.reset) {
      this.dataOptions = {
        paginationOptions: {
          pageSize: 30,
          pageNumber: 1
        },
        sortOptions: [],
        FilterOptions: []
      }
    }
    this.isLoading = true;
    this.listCustomersUseCase
    .execute(this.dataOptions)
    .subscribe({
      next: (resp) =>{
        this.pagedCustomers = resp;
        this.customers = this.customers.concat(resp.result);
        this.isLoading = false;
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }
}
