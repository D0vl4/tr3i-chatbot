// Chat Service - API integration for AI chatbot

const API_URL = "https://bnvbuhyxugu5tw56ox4ehtsi5u0yldef.lambda-url.us-east-1.on.aws/";

// Types
export interface ChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  question: string;
  history?: ChatHistoryItem[];
}

export interface ChatResponse {
  answer: string;
  usage?: {
    prompt_tokens: number;
    cached_tokens: number;
    completion_tokens: number;
  };
}

// Send a message to the chatbot API
export async function sendMessage(question: string, history: ChatHistoryItem[] = []): Promise<string> {
  const requestBody: ChatRequest = {
    question,
    history,
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
      throw new Error(`API error: ${response.status} ${await response.text()}`);
    }

    const data: ChatResponse = await response.json();

    if (!data.answer) {
      throw new Error("No response received from AI");
    }

    return data.answer;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get AI response: ${error.message}`);
    }
    throw new Error("An unexpected error occurred");
  }
}
