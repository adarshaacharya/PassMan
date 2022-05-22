import { useSession } from 'next-auth/react';
import React from 'react';

type AuthWrapperProps = {
  children: React.ReactNode;
};

function AuthWrapper({ children }: AuthWrapperProps) {
  const { status } = useSession();

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  return <React.Fragment>{children} </React.Fragment>;
}

export default AuthWrapper;
