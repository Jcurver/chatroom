
import { Chat } from '@/entities/chat/model/types';
import { chatApi } from '@/shared/api';

export const createChat = async (): Promise<Chat> => {
  return await chatApi.createChat();
};
