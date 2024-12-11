import { useParams, useNavigate } from 'react-router-dom';
import { ChatWindow } from '@/widgets/chat-window';
import { ChatSidebar } from '@/widgets/chat-sidebar';
import { useEffect } from 'react';
import { chatApi } from '@/shared/api/chat';

export function ChatPage() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatId) {
      navigate('/');
      return;
    }

    const validateChat = async () => {
      try {
        await chatApi.getChat(chatId);
      } catch (error) {
        console.error('Chat not found:', error);
        navigate('/');
      }
    };

    validateChat();
  }, [chatId, navigate]);

  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {chatId ? (
          <ChatWindow chatId={chatId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat or create a new one
          </div>
        )}
      </div>
    </div>
  );
}
