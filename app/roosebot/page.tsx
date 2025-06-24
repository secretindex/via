"use client";

import { RoosebotContext } from "@/components/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowUpFromDot, LucideUser } from "lucide-react";
import { BaseSyntheticEvent, useContext, useState } from "react";
import ReactMarkdown from "react-markdown";

const Roosebot = () => {
  const roosebot = useContext(RoosebotContext);
  const [aiMessage, setAiMessage] = useState<string>("");
  console.log(roosebot?.messages);

  const roosebotMessages = roosebot?.messages.slice(1);

  const handleSubmitMessage = () => {
    if (!aiMessage) return;
    axios.post("/api/roosebot");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col justify-center items-center gap-2 p-4 w-2/4 border-[1px] border-[#0004]">
        <h1 className="text-xl font-bold">Fale com o Roosebot!</h1>
        <div id="message-box" className="rounded-md p-4">
          <div className="flex flex-col gap-4">
            {roosebotMessages?.map((message) => {
              return (
                <span key={message.content}>
                  <div className="text-sm bg-sky-400">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="Qual a sua dúvida?"
            className="w-full"
            onChange={(e: BaseSyntheticEvent) => setAiMessage(e.target.value)}
            onKeyPress={(e: BaseSyntheticEvent) => e}
          />{" "}
          {!aiMessage ? (
            <Button disabled>
              <ArrowUpFromDot />
            </Button>
          ) : (
            <Button onClick={handleSubmitMessage} className="cursor-pointer">
              <ArrowUpFromDot />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roosebot;
