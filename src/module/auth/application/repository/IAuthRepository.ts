export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface IAuthRepository {
  getRefreshToken(id: number): Promise<string>;
}
