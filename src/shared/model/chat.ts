export interface Dialouge {
  dialouge_id: string;
  prompt: string;
  completion: string;
}

export interface ChatListItem {
  chat_model_id: string;
  chat_model_name: string;
  chat_id: string;
  dialouges: Dialouge[];
}

export type PostChatProps = Pick<ChatListItem, 'chat_model_id'>;

export type PostChatResponse = ChatListItem;

export type GetChatsResponse = ChatListItem[];

export type GetChatProps = {
  chat_id: string;
};

export type GetChatResponse = ChatListItem;

export type PostChatDialogueProps = {
  chat_id: string;
  prompt: string;
};

export type PostChatDialogueResponse = ChatListItem;

export type GetChatModelResponse = Pick<ChatListItem, 'chat_model_id' | 'chat_model_name'>;
