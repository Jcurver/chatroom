import { useState, useEffect, useRef } from 'react';
import { MessageList } from './ui/message-list';
import { MessageInput } from './ui/message-input';
import { ModelSelector } from './ui/model-selector';
import { ScrollToBottom } from './ui/scroll-to-bottom';
import { useChat } from './model/use-chat';
import { ChatModel } from '@/entities/model/types';
import { chatApi } from '@/shared/api/chat';
import { useNavigate } from 'react-router-dom';

interface ChatWindowProps {
  chatId?: string;
}

export function ChatWindow({ chatId = '' }: ChatWindowProps) {
  const [models, setModels] = useState<ChatModel[]>([]);
  const [selectedModel, setSelectedModel] = useState<ChatModel | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId || null);
  const [isLoadingModels, setIsLoadingModels] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { chat, sendMessage, isLoading: isSending, loadChat } = useChat(currentChatId);

  useEffect(() => {
    if (chatId) {
      setCurrentChatId(chatId);
    } else {
      setCurrentChatId(null);
      setSelectedModel(null);
    }
  }, [chatId]);

  useEffect(() => {
    if (chat && models.length > 0) {
      const chatModel = models.find((m) => m.chat_model_id === chat.chat_model_id);
      if (chatModel) {
        setSelectedModel(chatModel);
      }
    }
  }, [chat, models]);

  useEffect(() => {
    const initializeChat = async () => {
      await loadModels();
      if (chatId) {
        await loadChat();
      }
    };
    initializeChat();
  }, []);

  const loadModels = async () => {
    try {
      setIsLoadingModels(true);
      const modelList = await chatApi.getChatModels();
      setModels(modelList);
      if (!chatId && modelList.length > 0) {
        setSelectedModel(modelList[0]);
      }
    } catch (error) {
      console.error('Failed to load models:', error);
    } finally {
      setIsLoadingModels(false);
    }
  };

  const handleModelChange = async (model: ChatModel) => {
    if (currentChatId) {
      try {
        const newChat = await chatApi.createChat({ chat_model_id: model.chat_model_id });
        window.dispatchEvent(new Event('chat-updated'));
        navigate(`/chat/${newChat.chat_id}`);
      } catch (error) {
        console.error('Failed to create new chat:', error);
      }
    } else {
      setSelectedModel(model);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      if (!currentChatId && selectedModel) {
        const newChat = await chatApi.createChat({ chat_model_id: selectedModel.chat_model_id });
        setCurrentChatId(newChat.chat_id);
        window.dispatchEvent(new Event('chat-updated'));
        navigate(`/chat/${newChat.chat_id}`);

        await sendMessage(content);
      } else {
        await sendMessage(content);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const buffer = 100;
    setIsAtBottom(scrollHeight - scrollTop - clientHeight < buffer);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex-none p-4 border-b">
        <div className="relative">
          <ModelSelector
            models={models}
            selectedModel={selectedModel}
            onChange={handleModelChange}
            isLoading={isLoadingModels}
            disabled={!!currentChatId}
          />
        </div>
      </div>

      <div ref={chatContainerRef} className="flex-1 overflow-y-auto" onScroll={handleScroll}>
        <MessageList dialouges={chat?.dialouges || []} isLoading={isSending} />
        <div ref={messagesEndRef} />
        {!isAtBottom && <ScrollToBottom onClick={scrollToBottom} />}
      </div>

      <div className="flex-none p-4 border-t">
        <MessageInput
          onSend={handleSendMessage}
          disabled={!selectedModel || isLoadingModels || isSending}
        />
      </div>
    </div>
  );
}
