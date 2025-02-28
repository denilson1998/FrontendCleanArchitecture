export interface RegisterUserEntity {
    auth0id: string,
    email: string,
    emailVerified: boolean,
    token: string,
    refreshToken: string
}