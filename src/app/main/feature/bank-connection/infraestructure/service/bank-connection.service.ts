import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginOptions, OAuthService } from 'angular-oauth2-oidc';
import jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BankConnectionService {

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {

  }
  getJwks() : Promise<object> {
    return new Promise((resolve, reject) =>{
      this.httpClient.get("https://bfsmb-staging-bouncer-v2.fassil.com.bo/.well-known/openid-configuration")
      .subscribe((d: any) => {resolve(d.jwks)})
    })
  }


  async configureSSO(): Promise<void>{
    var jwks = await this.getJwks();
      this.oauthService.configure(
      { 
        issuer: environment.Bouncer.BOUNCER_BASE_URL,
        jwks: jwks,
        tokenEndpoint: `${environment.Bouncer.BOUNCER_BASE_URL}/connect/token`,
        redirectUri: environment.Bouncer.BOUNCER_CALLBACK,
        clientId: environment.Bouncer.BOUNCER_IDENTIFIER,
        scope: 'openid profile offline_access atlas flutter_test' }
      );
      this.oauthService.events.subscribe(e  => console.log(e))
      var aa: LoginOptions = {
        disableNonceCheck: true,
        disableOAuth2StateCheck: true,
        onLoginError: (e) =>  console.log(e)
      }
      this.oauthService.loadDiscoveryDocumentAndLogin(aa).then((e) =>{
        const token = this.oauthService.getAccessToken()
        const user = this.oauthService.getIdentityClaims()
        console.log(e)
      }).catch(e => console.log(e))
  }
}
