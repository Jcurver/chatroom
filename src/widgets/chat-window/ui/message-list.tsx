import { Dialouge } from '@/shared/model/chat';
import { Message } from './message';

interface MessageListProps {
  dialouges: Dialouge[];
  isLoading?: boolean;
}

export function MessageList({ dialouges, isLoading }: MessageListProps) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {dialouges.map((dialouge) => (
        <div key={dialouge.dialouge_id} className="space-y-4">
          <Message content={dialouge.prompt} isUser={true} />
          <Message content={dialouge.completion} isUser={false} />
        </div>
      ))}

      {isLoading && (
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="animate-bounce">●</div>
          <div className="animate-bounce delay-100">●</div>
          <div className="animate-bounce delay-200">●</div>
        </div>
      )}
    </div>
  );
}
