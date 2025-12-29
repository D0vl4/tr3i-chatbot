import React from 'react';
import AiButton from './AiButton';

interface ButtonScreenProps {
  onButtonClick: () => void;
}

export default function ButtonScreen({ onButtonClick }: ButtonScreenProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <AiButton onClick={onButtonClick} />
    </div>
  );
}

