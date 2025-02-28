import { Injectable } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { UserGateway } from 'src/app/main/feature/users/domain/gateways/user.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse, PagedResponseModel } from 'src/app/shared/domain/entities/paged-response';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { environment } from 'src/environments/environment';
import { UserEntity2, UserFromListEntity } from '../../../auth/domain/entities/user.entity';
import { UserFromListModel, UserModel } from '../models/user.model';
import { CreateUserDto } from '../../domain/dtos/create-user.dto';
import { UpdateUserDto } from '../../domain/dtos/update-user.dto';
import { Role } from '../../domain/enums/roles';
import { UpdateUserCommand } from '../commands/update-user.command';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable({
  providedIn: 'root',
})
export class UserService extends UserGateway {

  constructor(private apiService: ApiService) {
    super();
  }

  assignRoleToUser(userId: number, role: Role): Observable<void> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .post<void>(
        `${environment.onboardingApi}/organizations/${userInfo.currentOrganizationId}/clients/${userId}/roles`,
        {
          role: role,
        }
      )
  }
  edit(dto: UpdateUserDto): Observable<void> {
    const command = new UpdateUserCommand(dto);
    return this.apiService
      .put<void>(
        `${environment.onboardingApi}/clients/${dto.id}`,
        command
      )
  }

  add(dto: CreateUserDto): Observable<UserEntity2> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    const command = new CreateUserCommand(dto);
    return this.apiService
      .post<UserModel>(
        `${environment.onboardingApi}/organizations/${userInfo.currentOrganizationId}/clients/`,
        command
      )
      .pipe(map((user) => new UserModel(user).toEntity(userInfo.currentOrganizationId)));
  }

  remove(userId: number): Observable<void> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .delete<void>(
        `${environment.onboardingApi}/organizations/${userInfo.currentOrganizationId}/clients/${userId}`
      )
  }

  list(params: DataOptions): Observable<PagedResponse<UserFromListEntity>> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .getwithPagination<PagedResponseModel<UserFromListModel>>(
        `${environment.onboardingApi}/organizations/${userInfo.currentOrganizationId}/clients`,
        params
      )
      .pipe(map((pagedResponse) => {
        return new PagedResponse<UserFromListEntity>(
          pagedResponse.pageNumber,
          pagedResponse.pageSize,
          pagedResponse.totalPages,
          pagedResponse.totalRecords,
          pagedResponse.result.map((item: UserFromListModel) => (new UserFromListModel(item)).toEntity())
        )
      }));
  }

  getUserByAuth0Id(userId: string): Observable<UserEntity2> {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    return this.apiService
      .get<UserModel>(
        `${environment.onboardingApi}/clients/by-auth0/${userId}`
      )
      .pipe(map((user) => new UserModel(user).toEntity(userInfo.currentOrganizationId)));
  }

}
