import React, { createContext, ReactNode, useContext, useState } from 'react';
import { UserLoginInput } from '../../graphql/types';
import client from '../../modules/apollo/apolloClient';
import { AUTH_TOKEN } from '../../modules/apollo/auth-link/constants';
import { AuthContextType } from '../../types/AuthContextType';
import { LoginDocument, LoginMutation } from '../organisms/LoginForm/LoginForm.generated';

const AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserLoginInput>(null!);

  const login = async (values: UserLoginInput, callback: VoidFunction) => {
    return client
      .mutate<LoginMutation>({
        mutation: LoginDocument,
        variables: { input: { identifier: values.identifier, password: values.password } }
      })
      .then(({ data }) => {
        if (data) {
          setUser(values);
          localStorage.setItem(AUTH_TOKEN, data.login);
          callback();
        }
      });
  };

  const value = { user, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
