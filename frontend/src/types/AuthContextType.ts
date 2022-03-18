import { UserLoginInput } from '../graphql/types';

export interface AuthContextType {
  user: UserLoginInput;
  login: (values: UserLoginInput, callback: VoidFunction) => Promise<void>;
}
