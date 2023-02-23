export interface UserCredentials {
  token?: string;
  username: string;
  name: string;
}

export interface NewUserCredentials extends UserCredentials {
  password: string;
}
