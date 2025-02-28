import jwt_decode from 'jwt-decode';

export class JWT2JSONUtil {


    static tokenDecode(token: string) : any{
        try {
            return jwt_decode(token)
        } catch (error) {
            return null
        }
    }

    static getJWTExpiration(token: string){
        try {
            const tokendecoded = this.tokenDecode(token)
            return tokendecoded.exp
        } catch (error) {
            return null
        }
    }

}