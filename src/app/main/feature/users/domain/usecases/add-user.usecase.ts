import { Observable, concatMap, forkJoin, map } from 'rxjs';
import { UseCase } from 'src/app/shared/domain/usecases/use-case';
import { UserGateway } from '../gateways/user.gateway';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity2 } from '../../../auth/domain/entities/user.entity';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class AddUserUseCase
  implements UseCase<CreateUserDto, void> {

  constructor(private userRepository: UserGateway) {}

  execute(dto: CreateUserDto): Observable<void> {
    return this.userRepository.add(dto)
    .pipe(concatMap(newUser => this.userRepository.assignRoleToUser(newUser.id, dto.role)));
  }
}

// export class AddUserUseCase
//   implements UseCase<CreateUserDto, Promise<UserEntity2>> {

//   constructor(private userRepository: UserGateway) {}

//   execute(dto: CreateUserDto): Observable<Promise<UserEntity2>> {
//     return this.userRepository.add(dto)
//       .pipe(map((newUser) => {
//         return new Promise<UserEntity2>((resolve, reject) => {
//           const updateDto = new UpdateUserDto(
//             newUser.id,
//             dto.role,
//             dto.firstName,
//             dto.firstLastName,
//             dto.secondLastName,
//             dto.phoneNumber,
//           );
//           this.userRepository.edit(updateDto)
//           .subscribe({
//             next: () => resolve(newUser),
//             error: (err) => reject(err)
//           });
//         });
//       }));
//   }
// }
