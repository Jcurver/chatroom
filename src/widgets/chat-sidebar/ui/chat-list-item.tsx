import type { ChatListItem } from '@/shared/model/chat';
import { Link } from 'react-router-dom';

interface ChatListItemProps {
  chat: ChatListItem;
  isSelected: boolean;
}

export function ChatListItem({ chat, isSelected }: ChatListItemProps) {
  const firstDialouge = chat.dialouges?.[0];

  return (
    <Link
      to={`/chat/${chat.chat_id}`}
      className={`block p-4 hover:bg-gray-100 border-b ${
        isSelected ? 'bg-blue-50 hover:bg-blue-100' : ''
      }`}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold truncate flex-1">{firstDialouge?.prompt || 'New Chat'}</h2>
          <span className="text-xs text-gray-500 ml-2">{chat.chat_model_name}</span>
        </div>
      </div>
    </Link>
  );
}
