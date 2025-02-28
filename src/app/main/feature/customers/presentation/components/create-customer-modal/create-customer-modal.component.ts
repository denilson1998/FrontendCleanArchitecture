import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AtomModule } from '@sitec/sarao';
import { CreateCustomerDto } from '../../../domain/dtos/create-customer.dto';
import { CustomerEntity } from '../../../domain/entities/customer.entity';
import { AddCustomerUseCase } from '../../../domain/usecases/add-customer.usecase';

@Component({
  selector: 'create-customer-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AtomModule
  ],
  templateUrl: './create-customer-modal.component.html',
  styleUrls: ['./create-customer-modal.component.scss']
})
export class CreateCustomerModalComponent {
  @Output() customerCreated = new EventEmitter<CustomerEntity>();
  
  formGroup = this.fb.group({
    name: [null, Validators.required],
    phoneNumber: [null],
    email: [null, Validators.email],
    location: [null],
  })

  constructor(
    private fb: FormBuilder,
    private addCustomerUseCase: AddCustomerUseCase,
  ) {
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
        this.customerCreated.emit(resp);
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }
}
