import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InputFieldProps {
  onSend: (message: string) => void;
  className?: string;
  state?: 'Default' | 'Active';
  color?: 'Light' | 'Dark';
  disabled?: boolean;
}

export default function InputField({
  onSend,
  className = '',
  state = 'Default',
  color = 'Light',
  disabled = false,
}: InputFieldProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled) {
      onSend(inputValue.trim());
      setInputValue('');
    }
  };

  const isDark = color === 'Dark';
  const bgColor = isDark
    ? 'bg-[rgba(255,255,255,0.05)] border-white'
    : 'bg-[rgba(0,0,0,0.05)] border-white';
  const textColor = isDark
    ? 'text-[rgba(255,255,255,0.9)]'
    : 'text-[rgba(0,0,0,0.9)]';
  const buttonBg = 'bg-[#2668c5] border-[#2668c5]';

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="h-full w-full">
        <div
          className={`absolute backdrop-blur-lg backdrop-filter ${bgColor} border border-solid border-white inset-0 overflow-clip rounded-[10px]`}
        >
          <div className="absolute h-[56px] left-[-1px] overflow-clip top-[-1px] w-[560px]">
            <div className="absolute flex h-[44px] items-center justify-between left-[16px] top-[6px] w-[534px]">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={disabled ? 'Waiting for response...' : 'Ask anything about this course...'}
                disabled={disabled}
                className={`font-['Inter',sans-serif] font-medium leading-[1.5] relative flex-1 bg-transparent border-none outline-none ${textColor} text-base placeholder:${textColor} disabled:opacity-50`}
              />
              <button
                type="submit"
                disabled={disabled}
                className={`${buttonBg} border border-solid flex items-center justify-center p-[12px] relative rounded-[10px] shrink-0 hover:opacity-90 transition-opacity w-[44px] h-[44px] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Decorative element */}
      <div className="absolute flex inset-[98.21%_41.31%_1.79%_15.02%] items-center justify-center pointer-events-none">
        <div className="flex-none h-px rotate-180 w-[244.562px]">
          <div className="relative w-full h-full">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-[#2668c5] to-transparent opacity-30" />
          </div>
        </div>
      </div>
    </div>
  );
}

