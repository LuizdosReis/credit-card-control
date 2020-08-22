export interface AuthenticationResponse {
    authenticationToken: string;
    expiresAt: string;
    refreshToken: string;
    username: string;
}
