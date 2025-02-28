import { Observable } from 'rxjs';
import { LoginModel } from '../../infrastructure/models/login.model';
import { RegisterModel } from '../../infrastructure/models/register.model';
import { LoginResult } from '../entities/login.entity';
import { RegisterUserEntity } from '../entities/register-user.entity';
import { UserEntity } from '../entities/user.entity';

export abstract class UserGateway {
  abstract login(params: LoginModel): Observable<LoginResult>;
  abstract getUserInfo(): Observable<UserEntity>;
  abstract getAccessToken(): any;
  abstract register(params: RegisterModel): Observable<RegisterUserEntity>;
  abstract forgetPassword(params: any): Observable<any>;
}
