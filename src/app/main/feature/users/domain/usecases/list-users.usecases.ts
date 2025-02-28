import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserGateway } from '../gateways/user.gateway';
import { DataOptions } from 'src/app/shared/domain/entities/data-options';
import { PagedResponse } from 'src/app/shared/domain/entities/paged-response';
import { UserFromListEntity } from '../../../auth/domain/entities/user.entity';

export class ListUsersUseCase
  implements UseCase<DataOptions, PagedResponse<UserFromListEntity>>
{
  constructor(private userRepository: UserGateway) {}
  execute(params: DataOptions): Observable<PagedResponse<UserFromListEntity>> {
    return this.userRepository.list(params);
  }
}
