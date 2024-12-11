import { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';

      // 3줄 이상일 때만 스크롤 추가
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const minHeight = lineHeight * 3;
      const scrollHeight = textarea.scrollHeight;

      textarea.style.height = scrollHeight > minHeight ? `${minHeight}px` : `${scrollHeight}px`;

      textarea.style.overflowY = scrollHeight > minHeight ? 'auto' : 'hidden';
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSend(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={disabled}
          className="flex-1 p-2 border rounded resize-none min-h-[48px]"
          placeholder={disabled ? 'Select a model to start chatting...' : 'Type your message...'}
          rows={1}
        />
        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Send
        </button>
      </div>
    </form>
  );
}
