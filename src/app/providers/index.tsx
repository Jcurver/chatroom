import { ReactNode } from 'react';
export { Router } from './router';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return children;
}
