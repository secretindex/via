"use client";

import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type AiMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type RoosebotContextType = {
  messages: AiMessage[];
  setMessages: Dispatch<SetStateAction<AiMessage[]>>;
  clearChat: () => void;
};

export const RoosebotContext = createContext<RoosebotContextType | undefined>(
  undefined,
);

export const RoosebotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      role: "system",
      content: `Você é o Roosebot, um assistente virtual carismático e direto.
         fale em português do Brasil. Seja simpático e divertido,
         sempre forneça respostas corretas sobre o sistema da empresa. Voce é o bot que tem o
         nome do patrão da empresa, que é Roosevelt.`,
    },
  ]);

  const clearChat = () => {
    setMessages([
      {
        role: "system",
        content: `Você é o Roosebot, um assistente virtual carismático e direto.
             fale em português do Brasil. Seja simpático e divertido,
             sempre forneça respostas corretas sobre o sistema da empresa. Voce é o bot que tem o
             nome do patrão da empresa, que é Roosevelt.`,
      },
    ]);
  };

  return (
    <RoosebotContext.Provider value={{ messages, setMessages, clearChat }}>
      {children}
    </RoosebotContext.Provider>
  );
};
