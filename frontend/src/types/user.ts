export interface UserCredentials {
  token?: string;
  username: string;
  name: string;
}

export interface NewUserCredentials extends UserCredentials {
  password: string;
}

export interface AuthState {
  user: UserCredentials | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
