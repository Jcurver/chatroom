import { useNavigate } from 'react-router-dom';
import { chatApi } from '@/shared/api/chat';

interface CreateChatButtonProps {
  onClick?: () => void;
  className?: string;
}

export function CreateChatButton({ onClick, className = '' }: CreateChatButtonProps) {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (onClick) {
      onClick();
    } else {
      try {
        const models = await chatApi.getChatModels();
        if (models.length > 0) {
          const newChat = await chatApi.createChat({
            chat_model_id: models[0].chat_model_id,
          });
          navigate(`/chat/${newChat.chat_id}`);
        }
      } catch (error) {
        console.error('Failed to create chat:', error);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
    >
      New Chat
    </button>
  );
}
