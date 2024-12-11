import { useState, useEffect } from 'react';
import { ChatListItem } from '@/shared/model/chat';
import { chatApi } from '@/shared/api/chat';

export function useChat(chatId: string | null) {
  const [chat, setChat] = useState<ChatListItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (chatId) {
      loadChat();
    } else {
      setChat(null);
    }
  }, [chatId]);

  const loadChat = async () => {
    if (!chatId) return;

    try {
      setIsLoading(true);
      const chatData = await chatApi.getChat(chatId);
      if (chatData) {
        setChat(chatData);
      }
    } catch (error) {
      console.error('Failed to load chat:', error);
      setChat(null);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (prompt: string) => {
    if (!chatId) {
      throw new Error('Chat ID is required to send a message');
    }

    try {
      setIsLoading(true);
      const updatedChat = await chatApi.sendMessage({ chat_id: chatId, prompt });
      if (updatedChat) {
        setChat(updatedChat);
      }
      return updatedChat;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    chat,
    sendMessage,
    isLoading,
    loadChat,
  };
}
