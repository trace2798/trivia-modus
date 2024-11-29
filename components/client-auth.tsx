'use client';
import { FC } from 'react';
import { useUser } from '@stackframe/stack';

interface ClientAuthProps {}

const ClientAuth: FC<ClientAuthProps> = ({}) => {
  const user = useUser();
  return (
    <>
      <div>client-auth</div>
      <div>
        {user
          ? `Hello, ${user.displayName ?? 'anon'}`
          : 'You are not logged in'}
      </div>
    </>
  );
};

export default ClientAuth;
