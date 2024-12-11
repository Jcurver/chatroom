import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen flex flex-col">
      <header className="h-14 bg-white border-b flex-none">
        <div className="container mx-auto px-4 h-full flex items-center">
          <h1 className="text-xl font-bold">AI Chat Application</h1>
        </div>
      </header>
      <main className="flex-1 relative">{children}</main>
    </div>
  );
}
