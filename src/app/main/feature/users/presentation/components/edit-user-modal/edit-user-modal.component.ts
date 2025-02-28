import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AtomModule } from '@sitec/sarao';
import { UserBaseEntity, UserEntity2 } from 'src/app/main/feature/auth/domain/entities/user.entity';
import { UpdateUserDto } from '../../../domain/dtos/update-user.dto';
import { Role } from '../../../domain/enums/roles';
import { UpdateUserUseCase } from '../../../domain/usecases/update-user.usecase';
import { RemoveUserUseCase } from '../../../domain/usecases/remove-user.usecase';

@Component({
  selector: 'edit-user-modal',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    AtomModule
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  @Input() user!: UserBaseEntity;
  @Output() userEdited = new EventEmitter<UserEntity2>();
  get canRemoveUser() {
    console.log(this.user.role)
    return this.user.role !== Role.Owner
  };

  roleTypes = [
    'Administrador',
    'Vendedor',
  ]

  formGroup = this.fb.group({
    role: ['', Validators.required],
    firstName: ['', Validators.required],
    firstLastName: ['', Validators.required],
    secondLastName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private updateUserUseCase: UpdateUserUseCase,
    private removeUserUseCase: RemoveUserUseCase,
    ) {
  }

  ngOnInit(): void {
    if (this.user.role === Role.Owner) {
      this.formGroup.controls.role.removeValidators(Validators.required)
    }
  }

  onRoleSelected(role: string) {
    this.formGroup.controls.role.setValue(role);
  }
  
  editUser() {

    if (!this.formGroup.valid) {
      return;
    }
    const role = this.formGroup.value.role === 'Administrador' ? Role.Admin : Role.Seller
    
    const editRole = this.user.role !== Role.Owner;
    let editUserDto = new UpdateUserDto(
      this.user!.id,
      role,
      this.formGroup.value.firstName!,
      this.formGroup.value.firstLastName!,
      this.formGroup.value.secondLastName!,
      this.formGroup.value.phoneNumber!,
      editRole
    )
    this.updateUserUseCase
    .execute(editUserDto)
    .subscribe({
      next: resp =>{
        this.userEdited.emit();
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }

  removeUserFromOrganization() {
    this.removeUserUseCase
    .execute(this.user!.id)
    .subscribe({
      next: resp =>{
        this.userEdited.emit();
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }
}
