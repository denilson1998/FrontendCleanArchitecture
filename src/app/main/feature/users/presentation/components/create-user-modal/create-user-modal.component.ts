import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AtomModule } from '@sitec/sarao';
import { UserEntity2 } from 'src/app/main/feature/auth/domain/entities/user.entity';
import { CreateUserDto } from '../../../domain/dtos/create-user.dto';
import { AddUserUseCase } from '../../../domain/usecases/add-user.usecase';
import { Role } from '../../../domain/enums/roles';

@Component({
  selector: 'create-user-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AtomModule
  ],
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent {
  @Output() userCreated = new EventEmitter<void>();
  roleTypes = [
    'Administrador',
    'Vendedor',
  ]

  formGroup = this.fb.group({
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    firstLastName: ['', Validators.required],
    secondLastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private addUserUseCase: AddUserUseCase,
  ) {
  }
  onRoleSelected(role: string) {
    this.formGroup.controls.role.setValue(role);
  }
  
  createUser() {
    if (!this.formGroup.valid) {
      return;
    }
    const role = this.formGroup.value.role === 'Administrador' ? Role.Admin : Role.Seller

    let createUserDto = new CreateUserDto(
      role,
      this.formGroup.value.email!,
      this.formGroup.value.firstName ?? '',
      this.formGroup.value.firstLastName ?? '',
      this.formGroup.value.secondLastName ?? '',
      this.formGroup.value.phoneNumber ?? '',
    )
    this.addUserUseCase
    .execute(createUserDto)
    .subscribe({
      next: resp =>{
        this.userCreated.emit();
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }
}
