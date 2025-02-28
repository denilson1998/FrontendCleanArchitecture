import { Injectable } from '@angular/core';
import { map, Observable, pipe, switchMap } from 'rxjs';
import { LoginResult } from 'src/app/main/feature/auth/domain/entities/login.entity';
import { RegisterUserEntity } from 'src/app/main/feature/auth/domain/entities/register-user.entity';
import { UserEntity } from 'src/app/main/feature/auth/domain/entities/user.entity';
import { UserGateway } from 'src/app/main/feature/auth/domain/gateways/user.gateway';
import { ApiService } from 'src/app/shared/infrastructure/services/api.service';
import { JWT2JSONUtil } from 'src/app/shared/presentation/helpers/jwt2json.utils';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends UserGateway {
  userInfo!: UserEntity;

  constructor(private apiService: ApiService, private http: HttpClient, private tokenService: TokenStorageService) {
    super();
  }
  getAccessToken() {
    var expiresAt = localStorage.getItem('expires_at');
    if (expiresAt == null) {
      return null;
    }
    if (new Date(parseInt(expiresAt)) < new Date()) {
      return null;
    }
    var access_token = localStorage.getItem('access_token');
    return access_token;
  }

  register(params: RegisterModel): Observable<RegisterUserEntity> {
    return this.http
      .post<RegisterUserEntity>(
        `${environment.onboardingApi}/auth/register`,
        params
      )
      .pipe(
        map((data: RegisterUserEntity) => {
          const newSession: LoginResult = {
            expiresIn: JWT2JSONUtil.getJWTExpiration(data.token),
            refreshToken: data.refreshToken,
            accessToken: data.token,
          };
          this.tokenService.setSession(newSession);
          return data;
        })
      );
  }

  login(params: LoginModel): Observable<LoginResult> {
    return this.http
      .post<LoginResult>(`${environment.onboardingApi}/auth/login`, params)
      .pipe(
        map((data: LoginResult) => {
          this.tokenService.setSession(data);
          return data;
        })
      );
  }

  logout(): Observable<{ ok: boolean }> {
    return new Observable((observer) => {
    this.tokenService.signOut()
      observer.complete();
    })
  } 

    getUserInfo(): Observable<UserEntity> {
    return this.http.get<UserEntity>(
      `${environment.onboardingApi}/clients/myself`,
    ).pipe(
      map((data: UserEntity) => {
        debugger;
        this.userInfo = data
        if(this.userInfo.currentOrganizationId == null || undefined){
            if(this.userInfo.organizationRoles.length > 0){
              this.setCurrentOrganization(this.userInfo.organizationRoles[0].organizationId)
            }
     
        }
        this.setUserData(data)
        return data
      })
    )

  }


  forgetPassword(params: any): Observable<any> {
    return this.http.post(
      `${environment.onboardingApi}/auth/reset-password`,
      params
    );
  }


  refreshToken(token: string){
    const body = {
      "grant_type": 'refresh_token',
      "client_id" : environment.auth0.clientId,
      "client_secret": environment.auth0.clientSecret,
      "refresh_token": token
    }
    return this.http.post(environment.auth0.domain, {
      body
    })
  }

  public async setCurrentOrganization(organizationId: any) {
    var organization = this.userInfo.organizationRoles.find(
      (o: any) => o.organizationId === organizationId
    );
    if (organization == null) {
      throw new Error('Organization not found');
    }
    this.userInfo.role = organization.role;
    this.userInfo.currentOrganizationId = organization.organizationId;
  }

  private setSession(authResult: LoginResult): void {
    const expiresAt = Date.now() + parseInt(authResult.expiresIn) * 1000;
    localStorage.setItem('id_token', authResult.idToken!);
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    
  }

  private setUserData(userResult: UserEntity): void {
    localStorage.setItem('userInfo', JSON.stringify(userResult));
  }
}
