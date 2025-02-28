import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserGateway } from '../../domain/gateways/user.gateway';
import { GetUserByAuth0IdUseCase } from '../../domain/usecases/get-user-by-auth0-id.usecase';
import { ListUsersUseCase } from '../../domain/usecases/list-users.usecases';
import { UserService } from '../services/user.service';
import { AddUserUseCase } from '../../domain/usecases/add-user.usecase';
import { UpdateUserUseCase } from '../../domain/usecases/update-user.usecase';
import { RemoveUserUseCase } from '../../domain/usecases/remove-user.usecase';
import { GetUserUseCase } from '../../domain/usecases/get-user.usecase';

@NgModule({
  providers: [
    {
      provide: AddUserUseCase,
      useFactory: (userRepo: UserGateway) => new AddUserUseCase(userRepo),
      deps: [UserGateway],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepo: UserGateway) => new UpdateUserUseCase(userRepo),
      deps: [UserGateway],
    },
    {
      provide: RemoveUserUseCase,
      useFactory: (userRepo: UserGateway) => new RemoveUserUseCase(userRepo),
      deps: [UserGateway],
    },
    {
      provide: GetUserByAuth0IdUseCase,
      useFactory: (userRepo: UserGateway) => new GetUserByAuth0IdUseCase(userRepo),
      deps: [UserGateway],
    },
    {
      provide: GetUserUseCase,
      useFactory: (userRepo: UserGateway) => new GetUserUseCase(userRepo),
      deps: [UserGateway],
    },
    {
      provide: ListUsersUseCase,
      useFactory: (userRepo: UserGateway) => new ListUsersUseCase(userRepo),
      deps: [UserGateway],
    },
    {
      provide: UserGateway,
      useClass: UserService,
    },
  ],
  imports: [CommonModule, HttpClientModule],
})
export class UserDataModule {}
