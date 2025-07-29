"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type AiMessage = {
  role: "user" | "model";
  parts: Array<Object>;
};

type GeminiContextType = {
  messages: AiMessage[];
  setMessages: Dispatch<SetStateAction<AiMessage[]>>;
  clearChat: () => void;
};

export const GeminiContext = createContext<GeminiContextType | undefined>(
  undefined
);

export const GeminiProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<AiMessage[]>([]);

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <GeminiContext.Provider value={{ messages, setMessages, clearChat }}>
      {children}
    </GeminiContext.Provider>
  );
};
