import { Observable } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserGateway } from '../gateways/user.gateway';
import { UserEntity2 } from '../../../auth/domain/entities/user.entity';

export class GetUserByAuth0IdUseCase
  implements UseCase<string, UserEntity2>
{
  constructor(private userRepository: UserGateway) {}
  execute(auth0Id: string): Observable<UserEntity2> {
    return this.userRepository.getUserByAuth0Id(auth0Id);
  }
}
