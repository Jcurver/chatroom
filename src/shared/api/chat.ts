import {
  GetChatsResponse,
  GetChatResponse,
  PostChatProps,
  PostChatResponse,
  PostChatDialogueProps,
  PostChatDialogueResponse,
  GetChatModelResponse,
} from '@/shared/model/chat';

export const chatApi = {
  // 채팅 목록 조회
  async getChats(): Promise<GetChatsResponse> {
    const response = await fetch('/chats');
    if (!response.ok) {
      throw new Error('Failed to fetch chats');
    }
    const resJson = await response.json();
    return resJson.data;
  },

  // 특정 채팅 조회
  async getChat(chat_id: string): Promise<GetChatResponse> {
    const response = await fetch(`/chats/${chat_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch chat');
    }
    const resJson = await response.json();
    return resJson.data;
  },

  // 새 채팅 생성
  async createChat(props: PostChatProps): Promise<PostChatResponse> {
    const response = await fetch('/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });
    if (!response.ok) {
      throw new Error('Failed to create chat');
    }
    const resJson = await response.json();
    return resJson.data;
  },

  // 대화 메시지 전송
  async sendMessage(props: PostChatDialogueProps): Promise<PostChatDialogueResponse> {
    const response = await fetch(`/chats/${props.chat_id}/dialogues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: props.prompt }),
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    const resJson = await response.json();
    return resJson.data;
  },

  // 채팅 모델 목록 조회
  async getChatModels(): Promise<GetChatModelResponse[]> {
    const response = await fetch('/chat_model');
    if (!response.ok) {
      throw new Error('Failed to fetch chat models');
    }
    const resJson = await response.json();
    return resJson.data;
  },
};
