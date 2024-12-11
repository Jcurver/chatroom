interface MessageProps {
  content: string;
  isUser: boolean;
}

export function Message({ content, isUser }: MessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] p-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 rounded-bl-none'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
