export interface JwtPayload {
  userId: string;
  exp: number; // expiration time (UNIX timestamp in seconds)
  iat?: number;
}