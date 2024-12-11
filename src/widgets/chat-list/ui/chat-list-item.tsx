import { Link } from 'react-router-dom';
import { Chat } from '@/entities/chat/model/types';

interface ChatListItemProps {
  chat: Chat;
}

export function ChatListItem({ chat }: ChatListItemProps) {
  console.log('chatitem', chat);
  return (
    <Link to={`/chat/${chat?.id}`} className="block p-4 border rounded hover:bg-gray-50">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{chat?.title}</h2>
        <span className="text-sm text-gray-500">
          {new Date(chat?.createdAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
