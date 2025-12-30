// Chat Service - API integration for AI chatbot

const API_URL = "https://zrinja-lms.hf.space/chat";
const PDF_URL =
  "https://lms-chat-docs.s3.us-east-1.amazonaws.com/AbletonDocumentation.pdf";

// Types
export interface ChatRequest {
  message: string;
  pdf_url: string;
  user_id: string;
  /**
   * Compatibility fields for backends that expect alternate naming.
   * (Some deployments use camelCase or "question" instead of "message".)
   */
  question?: string;
  pdfUrl?: string;
  userId?: string;
}

export interface ChatResponse {
  response?: string;
  answer?: string;
  message?: string;
  error?: string;
}

// Generate or retrieve a unique user ID for this session
function getUserId(): string {
  const storageKey = "chatbot_user_id";
  let userId = localStorage.getItem(storageKey);

  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(storageKey, userId);
  }

  return userId;
}

// Send a message to the chatbot API
export async function sendMessage(message: string): Promise<string> {
  const userId = getUserId();

  const requestBody: ChatRequest = {
    message,
    // Compatibility with backends that expect "question"
    question: message,
    pdf_url: PDF_URL,
    // Compatibility with backends that expect camelCase
    pdfUrl: PDF_URL,
    user_id: userId,
    // Compatibility with backends that expect camelCase
    userId,
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();

    // Handle different possible response formats from the API
    const aiResponse = data.response || data.answer || data.message;

    if (!aiResponse) {
      throw new Error("No response received from AI");
    }

    return aiResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get AI response: ${error.message}`);
    }
    throw new Error("An unexpected error occurred");
  }
}
