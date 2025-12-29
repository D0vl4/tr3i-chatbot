import { X, MessageSquare, Trash2, Plus } from 'lucide-react';

export interface Conversation {
  id: string;
  title: string;
  messages: Array<{
    id: string;
    sender: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
}

interface HistoryPanelProps {
  onClose: () => void;
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  onDeleteConversation: (id: string) => void;
  onNewChat: () => void;
  currentConversationId?: string;
}

export default function HistoryPanel({
  onClose,
  conversations,
  onSelectConversation,
  onDeleteConversation,
  onNewChat,
  currentConversationId,
}: HistoryPanelProps) {
  return (
    <div className="relative w-[601px] h-[1080px] bg-white overflow-hidden">
      {/* Container */}
      <div className="absolute left-0 top-0 w-[601px] h-[1080px] bg-[#fbfdff] shadow-[-8px_-8px_8px_0px_rgba(0,0,0,0.1)] flex flex-col">
        {/* Header */}
        <div className="bg-white h-[64px] w-full z-[1] shrink-0">
          <div className="flex gap-4 items-center px-5 py-4 w-full">
            {/* Close Button */}
            <button 
              onClick={onClose}
              title="Close History"
              className="p-1 rounded hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-[#2668c5]" />
            </button>

            {/* Title */}
            <div className="flex-1 flex gap-2 items-center pl-1">
              <h1 className="flex-1 font-medium leading-8 text-[#243143] text-2xl truncate">
                Chat History
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

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
              <MessageSquare className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg text-center font-medium text-gray-500">No conversations yet</p>
              <p className="text-sm text-center mt-2 text-gray-400">Start chatting to see your history here</p>
              <button 
                onClick={onNewChat}
                className="mt-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2668c5] hover:bg-[#1d5299] transition-colors text-white text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Start New Chat
              </button>
            </div>
          ) : (
            <div className="py-3 px-4">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group flex items-center gap-4 px-4 py-4 mb-2 cursor-pointer rounded-lg border transition-all ${
                    currentConversationId === conversation.id 
                      ? 'bg-blue-50 border-[#2668c5]' 
                      : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm'
                  }`}
                  onClick={() => onSelectConversation(conversation)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    currentConversationId === conversation.id 
                      ? 'bg-[#2668c5]' 
                      : 'bg-gray-100'
                  }`}>
                    <MessageSquare className={`w-5 h-5 ${
                      currentConversationId === conversation.id 
                        ? 'text-white' 
                        : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#243143] truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(conversation.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-50 transition-all"
                    title="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

