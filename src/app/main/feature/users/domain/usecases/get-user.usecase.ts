import { Observable, map } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserGateway } from '../gateways/user.gateway';
import { UserBaseEntity, UserEntity2, UserFromListEntity } from '../../../auth/domain/entities/user.entity';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';


export class GetUserUseCase
  implements UseCase<number, UserBaseEntity>
{
  constructor(private userRepository: UserGateway) {}
  execute(userId: number): Observable<UserBaseEntity> {
    const dataOptions: DataOptions = {
      paginationOptions: {
        pageNumber: 1,
        pageSize: 1000000,
      },
      sortOptions: [],
      FilterOptions: [],
    }
    return this.userRepository.list(dataOptions)
    .pipe(map((response) => response.result.find((user) => user.id === userId)!));
  }
}
