import { signIn, signOut, useSession } from 'next-auth/react';
import * as React from 'react';

export const useAuth = () => {
  const { data: session, status } = useSession();

  return React.useMemo(
    () =>
      ({
        session,
        status,
        signIn,
        signOut,
      } as const),
    [session, status],
  );
};
