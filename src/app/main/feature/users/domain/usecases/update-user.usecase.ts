import { Observable, forkJoin, map } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserGateway } from '../gateways/user.gateway';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserUseCase
  implements UseCase<UpdateUserDto, void> {

  constructor(private userRepository: UserGateway) {}

  execute(dto: UpdateUserDto): Observable<void> {
    if (!dto.editRole) {
      return this.userRepository.edit(dto);
    }
    return forkJoin({
      add: this.userRepository.assignRoleToUser(dto.id, dto.role),
      edit: this.userRepository.edit(dto)
    })
    .pipe(map((forkJoinResult) => {return forkJoinResult.edit}));
  }
}
