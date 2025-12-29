import { Copy, RotateCw, ThumbsDown, ThumbsUp, Volume2 } from "lucide-react";

interface MessagesProps {
  sender: "user" | "ai";
  content: string;
  showActions?: boolean;
  isLoading?: boolean;
  className?: string;
}

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="flex gap-1 items-center py-2">
      <span className="w-2 h-2 bg-[#2668c5] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-[#2668c5] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-[#2668c5] rounded-full animate-bounce"></span>
    </div>
  );
}

export default function Messages({
  sender,
  content,
  showActions = false,
  isLoading = false,
  className = "",
}: MessagesProps) {
  const isUser = sender === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div
      className={`flex flex-col gap-1 w-full ${isUser ? 'items-end' : 'items-start'} ${className}`}
    >
      {/* Meta Info */}
      <div className={`flex items-start relative shrink-0 ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className="flex flex-col font-normal justify-center text-xs text-[rgba(36,49,67,0.7)]">
          <p className="leading-4">{isUser ? "You" : "AI Helper"}</p>
        </div>
      </div>

      {/* Message */}
      <div
        className={`${
          isUser
            ? "bg-[#e8f5e9] border-[#c8e6c9]"
            : "bg-[#f1f5ff] border-[rgba(38,104,197,0.1)]"
        } border border-solid flex flex-col gap-2 p-4 relative rounded ${isUser ? 'max-w-[85%]' : 'w-full'}`}
      >
        {isLoading ? (
          <TypingIndicator />
        ) : (
          <div className="font-normal leading-normal text-[#243143] text-sm w-full whitespace-pre-line">
            {content.split("\n").map((line, index) => (
              <p key={index} className="mb-0">
                {line || "\u00A0"}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && !isUser && !isLoading && (
        <div className="flex items-center overflow-visible relative shrink-0">
          <button 
            onClick={handleCopy}
            title="Copy to clipboard"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <Copy className="w-4 h-4 text-[#243143]" />
          </button>
          <button 
            title="Regenerate"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <RotateCw className="w-4 h-4 text-[#243143]" />
          </button>
          <button 
            title="Dislike"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <ThumbsDown className="w-4 h-4 text-[#243143]" />
          </button>
          <button 
            title="Like"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <ThumbsUp className="w-4 h-4 text-[#243143]" />
          </button>
          <button 
            title="Read aloud"
            className="flex items-center justify-center p-2 rounded hover:bg-gray-100 transition-colors"
          >
            <Volume2 className="w-4 h-4 text-[#243143]" />
          </button>
        </div>
      )}
    </div>
  );
}
