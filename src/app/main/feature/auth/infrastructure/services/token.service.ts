import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
const REFRESHTOKEN_KEY = 'refresh_token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);

  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESHTOKEN_KEY);
    localStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(REFRESHTOKEN_KEY);
  }

  public setSession(authResult:any){
    const expiresAt = Date.now() + parseInt(authResult.expiresIn) * 1000;
    
    this.saveToken(authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken!);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    this.saveRefreshToken(authResult.refreshToken)
}

}