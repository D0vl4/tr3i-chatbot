import React from 'react';
import { History, ExternalLink, Sparkles, Plus } from 'lucide-react';
import InputField from './InputField';

interface WelcomeScreenProps {
  onSendMessage: (message: string) => void;
  onQuickQuestionClick: (question: string) => void;
  onMenuClick?: () => void;
  onNewChat?: () => void;
}

export default function WelcomeScreen({ 
  onSendMessage, 
  onQuickQuestionClick,
  onMenuClick,
  onNewChat
}: WelcomeScreenProps) {
  const quickQuestions = [
    'Give me a quick summary of all the main points from this course',
    'What is the Tutoring outside activity in more terms',
    'What is the biggest problem in the Tutoring Space',
    "I don't understand these courses",
    'Help me write better essays with more understanding and punctuality',
  ];

  return (
    <div className="relative w-[601px] h-[1080px] bg-white overflow-hidden">
      {/* Chatbot Container */}
      <div className="absolute left-0 top-0 w-[601px] h-[1080px] bg-[#fbfdff] shadow-[-8px_-8px_8px_0px_rgba(0,0,0,0.1)]">
        {/* Header */}
        <div className="absolute left-0 top-0 w-[601px] bg-white h-[64px] z-[1]">
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
            <h1 className="font-medium leading-8 text-[#243143] text-2xl truncate">
              AI Helper
            </h1>

            {/* New Chat Button */}
            <button 
              onClick={onNewChat}
              title="New Chat"
              className="absolute left-[427px] flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2668c5] hover:bg-[#1d5299] transition-colors text-white text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>

            {/* Empty space on the right */}
            <div className="flex-1"></div>
          </div>
          {/* Divider */}
          <div className="bg-[rgba(38,104,197,0.1)] h-px w-full" />
        </div>

        {/* Main Content */}
        <div className="absolute top-[148px] bottom-[208px] left-0 w-[601px] flex flex-col gap-[50px] items-center">
          <div className="flex flex-col gap-[60px] items-center relative w-[489px]">
            {/* Welcome Content */}
            <div className="flex flex-col h-[394px] items-center justify-center relative w-full">
              {/* Icon */}
              <div className="flex items-center justify-center pb-4 pt-0 px-0 relative">
                <div className="relative w-[114px] h-[114px] flex items-center justify-center">
                  <div className="w-[114px] h-[114px] flex items-center justify-center rounded-full bg-gradient-to-br from-[#2668c5] to-[#7a2c9e]">
                    <Sparkles className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Body Text */}
              <div className="flex flex-col font-normal gap-5 items-center justify-center text-[#243143] text-center w-full">
                <p className="leading-[30px] relative text-2xl w-full">
                  <span>Hello! I'm </span>
                  <span className="font-bold">Course AI Helper</span>.
                  <br />
                  How can I assist you?
                </p>
                <p className="leading-6 relative text-base w-full">
                  This AI tutor is here to help you understand lessons better, explain difficult concepts, guide you through the course, and support you during quizzes—without giving you the answers. It's designed to keep you learning, confident, and on track.
                </p>
              </div>

              {/* AI Policy Link */}
              <div className="flex flex-col gap-4 items-center pb-0 pt-4 px-0 relative">
                <div className="flex flex-col gap-2 items-center relative w-full">
                  <button className="flex items-center px-0 py-1 relative">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold leading-6 text-[#2668c5] text-sm">
                        AI policy
                      </p>
                      <ExternalLink className="w-4 h-4 text-[#2668c5]" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Questions Heading */}
            <p className="font-medium leading-4 relative text-2xl text-black text-center w-full">
              Quick Questions:
            </p>
          </div>

          {/* Quick Questions Chips */}
          <div className="content-start flex flex-wrap gap-3 h-[204px] items-start pb-2 pt-1 px-5 relative w-full">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onQuickQuestionClick(question)}
                className="bg-[rgba(38,104,197,0.05)] border border-[rgba(38,104,197,0.1)] flex gap-2 h-[30px] items-center px-3 py-0 relative rounded-lg hover:bg-[rgba(38,104,197,0.1)] transition-colors"
              >
                <p
                  className="font-medium leading-4 text-base bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      'linear-gradient(220deg, rgb(254, 220, 42) 0%, rgb(221, 87, 137) 48.124%, rgb(122, 44, 158) 93.593%)',
                  }}
                >
                  {question}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Input Field */}
        <div className="absolute left-[21px] bottom-[20px] w-[560px] h-[56px]">
          <InputField onSend={onSendMessage} className="w-full h-full" />
        </div>

      </div>
    </div>
  );
}
