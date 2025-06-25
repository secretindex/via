"use client";

import { AiMessage, RoosebotContext } from "@/components/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowUpFromDot } from "lucide-react";
import {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";

const Roosebot = () => {
  const roosebot = useContext(RoosebotContext);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);
  const isResponding = useRef(false);

  console.log(roosebot?.messages);

  const roosebotMessages = roosebot?.messages.slice(1);

  useEffect(() => {
    if (!hasNewMessage || isResponding.current) return;

    const sendChatMessage = async () => {
      try {
        console.log("This is the object going to API", roosebot?.messages);
        const res = await axios.post("/api/roosebot", {
          chatAiMessages: roosebot?.messages,
        });

        roosebot?.setMessages((prev) => [
          ...prev,
          { role: "assistant", content: res.data.answer },
        ]);
      } catch (error: any) {
        console.log(error);
      } finally {
        setHasNewMessage(false);
        isResponding.current = false;
      }
    };

    sendChatMessage();
  }, [hasNewMessage, roosebot!.messages, roosebot!.setMessages]);

  const handleSubmitMessage = async () => {
    roosebot?.setMessages((prev) => [
      ...prev,
      { role: "user", content: aiMessage },
    ]);
    setHasNewMessage(true);
    setAiMessage("");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col justify-center items-center gap-2 p-4 w-2/4 border-[1px] border-[#0004]">
        <h1 className="text-xl font-bold">Fale com o Roosebot!</h1>
        <div id="message-box" className="rounded-md p-4 w-full">
          <div className="flex flex-col gap-2 p-4 max-h-[70vh] overflow-y-auto">
            {roosebotMessages!.map((message, i) => {
              return (
                <div
                  key={i}
                  className={`
                        max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2
                        ${message.role === "user" ? "self-end bg-blue-500 text-white" : ""}
                        ${message.role === "assistant" ? "self-start bg-gray-100 text-black" : ""}
                        ${message.role === "system" ? "text-xs text-gray-500 text-center" : ""}
                      `}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="Qual a sua dúvida?"
            className="w-full"
            value={aiMessage}
            onChange={(e: BaseSyntheticEvent) => setAiMessage(e.target.value)}
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
        <div onClick={() => roosebot?.clearChat()}>apagar mensagem</div>
      </div>
    </div>
  );
};

export default Roosebot;
