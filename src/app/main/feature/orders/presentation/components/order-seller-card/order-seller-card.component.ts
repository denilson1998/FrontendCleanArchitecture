import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserEntity2 } from 'src/app/main/feature/auth/domain/entities/user.entity';
import { GetUserByAuth0IdUseCase } from 'src/app/main/feature/users/domain/usecases/get-user-by-auth0-id.usecase';
import { UserDataModule } from 'src/app/main/feature/users/infrastructure/modules/user.data.module';
import { OrderDataModule } from '../../../infrastructure/modules/order.data.module';
import { Role } from 'src/app/main/feature/users/domain/enums/roles';

@Component({
  selector: 'order-seller-card',
  standalone: true,
  imports: [
    CommonModule,
    OrderDataModule,
    UserDataModule
  ],
  templateUrl: './order-seller-card.component.html',
  styleUrls: ['./order-seller-card.component.scss']
})
export class OrderSellerCardComponent implements OnInit {

  @Input() userAuth0Id!: string;
  user?: UserEntity2;

  get role() {
    if (!this.user?.role) {
      return;
    }
    switch (this.user.role) {
      case Role.Owner:
        return 'Propietario';

      case Role.Admin:
        return 'Administrador';

      case Role.Seller:
        return 'Vendedor';

      default:
        throw Error('Role not found');
    }
  }

  constructor(private getUserByAuth0IdUseCase: GetUserByAuth0IdUseCase) {
  }

  ngOnInit(){
    this.getUser()
  }

  getUser(){
    this.getUserByAuth0IdUseCase
    .execute(this.userAuth0Id)
    .subscribe({
      next: (resp) =>{
        this.user = resp;
      },
      error: (e) =>{
        console.error(e)
      }
    })
  }
}
