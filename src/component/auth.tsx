import React from 'react';
import { Redirect } from 'umi';

const useAuth = () => {
  return {
    isLogin: false,
  };
};

const Auth: React.FC = ({ children }) => {
  const { isLogin } = useAuth();
  if(isLogin) {
    return <div>{children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Auth;
