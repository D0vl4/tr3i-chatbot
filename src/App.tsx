import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Chatbot from './components/Chatbot';
import HistoryPanel, { Conversation } from './components/HistoryPanel';
import { sendMessage } from './services/chatService';

type Screen = 'welcome' | 'chatbot' | 'history';

export type Message = {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
};

const STORAGE_KEY = 'chatbot_conversations';

// Load conversations from localStorage
function loadConversations(): Conversation[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((conv: Conversation) => ({
        ...conv,
        createdAt: new Date(conv.createdAt),
        messages: conv.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    }
  } catch (e) {
    console.error('Failed to load conversations:', e);
  }
  return [];
}

// Save conversations to localStorage
function saveConversations(conversations: Conversation[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (e) {
    console.error('Failed to save conversations:', e);
  }
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<'welcome' | 'chatbot'>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);

  // Load conversations on mount
  useEffect(() => {
    setConversations(loadConversations());
  }, []);

  // Save current conversation when messages change
  useEffect(() => {
    if (messages.length > 0 && currentConversationId) {
      setConversations(prev => {
        const updated = prev.map(conv => 
          conv.id === currentConversationId 
            ? { ...conv, messages } 
            : conv
        );
        saveConversations(updated);
        return updated;
      });
    }
  }, [messages, currentConversationId]);

  const handleSendMessage = async (content: string) => {
    // When user sends a message from welcome screen, switch to chatbot screen
    if (currentScreen === 'welcome') {
      setCurrentScreen('chatbot');
      
      // Create a new conversation
      const newConversation: Conversation = {
        id: Date.now().toString(),
        title: content.slice(0, 50) + (content.length > 50 ? '...' : ''),
        messages: [],
        createdAt: new Date(),
      };
      setCurrentConversationId(newConversation.id);
      setConversations(prev => {
        const updated = [newConversation, ...prev];
        saveConversations(updated);
        return updated;
      });
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the API
      const aiResponse = await sendMessage(content);
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: aiResponse,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      // Add error message as AI response
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: error instanceof Error 
          ? `Sorry, I encountered an error: ${error.message}. Please try again.`
          : 'Sorry, something went wrong. Please try again.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    setCurrentScreen('chatbot');
    handleSendMessage(question);
  };

  const handleMenuClick = () => {
    // Remember where we came from to go back
    if (currentScreen !== 'history') {
      setPreviousScreen(currentScreen as 'welcome' | 'chatbot');
    }
    setCurrentScreen('history');
  };

  const handleCloseHistory = () => {
    setCurrentScreen(previousScreen);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setCurrentScreen('welcome');
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setMessages(conversation.messages);
    setCurrentConversationId(conversation.id);
    setCurrentScreen('chatbot');
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => {
      const updated = prev.filter(conv => conv.id !== id);
      saveConversations(updated);
      return updated;
    });
    
    // If we deleted the current conversation, start fresh
    if (id === currentConversationId) {
      setMessages([]);
      setCurrentConversationId(null);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-gray-100">
      {currentScreen === 'welcome' && (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <WelcomeScreen
            onSendMessage={handleSendMessage}
            onQuickQuestionClick={handleQuickQuestionClick}
            onMenuClick={handleMenuClick}
            onNewChat={handleNewChat}
          />
        </div>
      )}
      {currentScreen === 'chatbot' && (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <Chatbot 
            initialMessages={messages} 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onMenuClick={handleMenuClick}
            onNewChat={handleNewChat}
          />
        </div>
      )}
      {currentScreen === 'history' && (
        <div className="w-full h-full flex items-center justify-center overflow-hidden">
          <HistoryPanel
            onClose={handleCloseHistory}
            conversations={conversations}
            onSelectConversation={handleSelectConversation}
            onDeleteConversation={handleDeleteConversation}
            onNewChat={handleNewChat}
            currentConversationId={currentConversationId || undefined}
          />
        </div>
      )}
    </div>
  );
}

export default App
