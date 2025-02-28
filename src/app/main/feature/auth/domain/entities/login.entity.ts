export interface LoginResult {
    idToken?: string;
    expiresIn: string;
    refreshToken: string;
    accessToken: string;
    tokenType?: string;

}
