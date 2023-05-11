"use client"

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface IProviderProps {
    children?: React.ReactNode;
    session?: Session | null | undefined;
}

const Provider = (props: IProviderProps) => {
  return (
    <SessionProvider session={props.session}>
        {props.children}
    </SessionProvider>
  )
}

export default Provider