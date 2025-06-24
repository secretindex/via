"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type RoosebotContextType = {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearChat: () => void;
};

export const RoosebotContext = createContext<RoosebotContextType | undefined>(
  undefined,
);

export const RoosebotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: `Você é o Roosebot, um assistente virtual carismático e direto.
         fale em português do Brasil. Use gírias leves, seja simpático e divertido,
         sempre forneça respostas corretas sobre o sistema da empresa. Voce é o bot que tem o
         nome do patrão da empresa, que é Roosevelt.`,
    },
  ]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "system",
        content: `Você é o Roosebot, um assistente virtual carismático e direto.
             fale em português do Brasil. Use gírias leves, seja simpático e divertido,
             sempre forneça respostas corretas sobre o sistema da empresa. Voce é o bot que tem o
             nome do patrão da empresa, que é Roosevelt.`,
      },
    ]);
  };

  return (
    <RoosebotContext.Provider value={{ messages, addMessage, clearChat }}>
      {children}
    </RoosebotContext.Provider>
  );
};
