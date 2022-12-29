// contexts/index.tsx
import { ReactNode } from 'react';
import { SocketProvider } from './app/socket';

const AppContextProviders = ({ children }: { children: ReactNode }) => (
  <SocketProvider >{children}</SocketProvider>
);

export default AppContextProviders;