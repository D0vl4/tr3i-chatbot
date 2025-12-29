import React from "react";
import ChatBubbleIcon from "./icons/ChatBubbleIcon";
import SparkleSmall from "./icons/SparkleSmall";
import SparkleLarge from "./icons/SparkleLarge";

interface AiButtonProps {
  onClick: () => void;
  className?: string;
  color?: "Light" | "Dark";
  size?: "Full" | "Circle" | "Small" | "Transperant";
}

export default function AiButton({
  onClick,
  className = "",
  color = "Dark",
  size = "Full",
}: AiButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-[#07284b] flex gap-[13px] items-center px-5 py-[10px] relative rounded-lg shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)] hover:opacity-90 transition-opacity ${className}`}
    >
      <div className="relative w-7 h-7 flex items-center justify-center">
        <ChatBubbleIcon className="w-7 h-7" />
        <SparkleSmall className="absolute top-[12px] left-[6px] w-[7px] h-[7px]" />
        <SparkleLarge className="absolute top-[2px] left-[13px] w-[12px] h-[12px]" />
      </div>
      <p className="font-semibold leading-6 relative text-2xl text-white whitespace-nowrap">
        Help me
      </p>
    </button>
  );
}
