import { ChatSidebar } from '@/widgets/chat-sidebar';
import { ChatWindow } from '@/widgets/chat-window';

export function HomePage() {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow chatId="" />
      </div>
    </div>
  );
}
