import { useRef, useEffect } from 'react';
import { History, Plus } from 'lucide-react';
import InputField from './InputField';
import Messages from './Messages';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

interface ChatbotProps {
  initialMessages?: Message[];
  onSendMessage?: (content: string) => void;
  isLoading?: boolean;
  onMenuClick?: () => void;
  onNewChat?: () => void;
}

export default function Chatbot({ 
  initialMessages = [], 
  onSendMessage, 
  isLoading = false,
  onMenuClick,
  onNewChat
}: ChatbotProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change or loading state changes
  useEffect(() => {
    // Use scrollTop instead of scrollIntoView to prevent parent window scrolling
    if (messagesContainerRef.current && messagesEndRef.current) {
      const container = messagesContainerRef.current;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      
      // Only scroll if we're near the bottom (within 100px)
      const isNearBottom = scrollHeight - container.scrollTop - clientHeight < 100;
      
      if (isNearBottom) {
        container.scrollTop = scrollHeight;
      }
    }
  }, [initialMessages, isLoading]);

  const handleSendMessage = (content: string) => {
    if (onSendMessage) {
      onSendMessage(content);
    }
  };

  return (
    <div className="relative w-[601px] h-[1080px] bg-white overflow-hidden">
      {/* Chatbot Container */}
      <div className="absolute left-0 top-0 w-[601px] h-[1080px] bg-[#fbfdff] shadow-[-8px_-8px_8px_0px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="bg-white h-[64px] w-full z-[1]">
          <div className="flex gap-4 items-center px-5 py-4 w-full">
            {/* History Icon */}
            <button 
              onClick={onMenuClick}
              title="Conversation History"
              className="p-1 rounded hover:bg-gray-100 transition-colors"
            >
              <History className="w-6 h-6 text-[#2668c5]" />
            </button>

            {/* Title */}
            <div className="flex-1 flex gap-2 items-center pl-1">
              <h1 className="flex-1 font-medium leading-8 text-[#243143] text-2xl truncate">
                AI Helper
              </h1>
            </div>

            {/* New Chat Button */}
            <button 
              onClick={onNewChat}
              title="New Chat"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2668c5] hover:bg-[#1d5299] transition-colors text-white text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>
          {/* Divider */}
          <div className="bg-[rgba(38,104,197,0.1)] h-px w-full" />
        </div>

        {/* Messages Area - Scrollable */}
        <div 
          ref={messagesContainerRef}
          className="absolute left-0 top-[64px] bottom-[80px] w-[601px] overflow-y-auto"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex flex-col gap-4 p-5">
            {initialMessages.map((message) => (
              <Messages
                key={message.id}
                sender={message.sender}
                content={message.content}
                showActions={message.sender === 'ai'}
              />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <Messages
                sender="ai"
                content=""
                isLoading={true}
              />
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Field */}
        <div className="absolute left-[21px] bottom-[20px] w-[560px] h-[56px]">
          <InputField 
            onSend={handleSendMessage} 
            className="w-full h-full" 
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
