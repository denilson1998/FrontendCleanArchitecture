import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AtomModule } from '@sitec/sarao';
import { CreateCustomerDto } from '../../../domain/dtos/create-customer.dto';
import { CustomerEntity } from '../../../domain/entities/customer.entity';
import { AddCustomerUseCase } from '../../../domain/usecases/add-customer.usecase';
import { UpdateCustomerUseCase } from '../../../domain/usecases/update-customer.usecases';
import { UpdateCustomerDto } from '../../../domain/dtos/update-customer.dto';

@Component({
  selector: 'edit-customer-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AtomModule
  ],
  templateUrl: './edit-customer-modal.component.html',
  styleUrls: ['./edit-customer-modal.component.scss']
})
export class EditCustomerModalComponent implements OnInit {
  @Output() customerEdited = new EventEmitter<CustomerEntity>();
  @Input() customer!: CustomerEntity;
  inited = false;
  formGroup = this.fb.group({
    name: ['', Validators.required],
    phoneNumber: [''],
    email: ['', Validators.email],
    location: [''],
  })
  


  constructor(
    private fb: FormBuilder,
    private updateCustomerUseCase: UpdateCustomerUseCase,
  ) {
  }
  ngOnInit(): void {
    console.log(this.customer .fullName)
    this.formGroup.patchValue({
      name: this.customer.fullName,
      phoneNumber: this.customer.phoneNumber,
      email: this.customer.email,
      location: this.customer.location,
    })
    this.inited = true;
  }

  editClient() {
    if (!this.formGroup || !this.formGroup?.valid) {
      return;
    }

    let updateCustomerDto = new UpdateCustomerDto(
      this.customer.id,
      this.formGroup.value.name!,
      this.formGroup.value.phoneNumber ?? undefined,
      this.formGroup.value.email ?? undefined,
      this.formGroup.value.location ?? undefined
    )
    this.updateCustomerUseCase
    .execute(updateCustomerDto)
    .subscribe({
      next: resp =>{
        this.customerEdited.emit(resp);
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }
}
