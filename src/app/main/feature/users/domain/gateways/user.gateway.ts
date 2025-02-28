import { Observable } from 'rxjs';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { UserEntity2, UserFromListEntity } from '../../../auth/domain/entities/user.entity';
import { Role } from '../enums/roles';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';

export abstract class UserGateway {
  abstract list(params: DataOptions): Observable<PagedResponse<UserFromListEntity>>;
  abstract getUserByAuth0Id(auth0Id: string): Observable<UserEntity2>;
  abstract assignRoleToUser(userId: number, role: Role): Observable<void>;
  abstract edit(dto: UpdateUserDto): Observable<void>;
  abstract add(dto: CreateUserDto): Observable<UserEntity2>;
  abstract remove(userId: number): Observable<void>;
}
