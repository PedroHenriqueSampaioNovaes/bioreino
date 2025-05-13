'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { IUser } from '@/common/@types/user';

type IUserContext = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const UserContext = createContext<IUserContext | null>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return context;
}

export function UserContextProvider({
  children,
  userData,
}: {
  children: ReactNode;
  userData: IUser | null;
}) {
  const [user, setUser] = useState<IUser | null>(userData);

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
}
