"use client";

import { AiMessage, RoosebotContext } from "@/components/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ArrowUpFromDot, Trash } from "lucide-react";
import {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useInsertionEffect,
  useRef,
  useState,
} from "react";
import ReactMarkdown from "react-markdown";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Roosebot = () => {
  const roosebot = useContext(RoosebotContext);
  const [aiMessage, setAiMessage] = useState<string>("");
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<
    "funcionario" | "cliente" | "nao especificado"
  >("nao especificado");

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
        setIsThinking(false);
        isResponding.current = false;
      }
    };

    sendChatMessage();
  }, [hasNewMessage, roosebot!.messages, roosebot!.setMessages]);

  const handleSubmitMessage = async () => {
    const userInfo = {
      role: "system",
      content: `O nome do usuário é ${name ? name : "sem nome"} - O usuário é ${role}`,
    };

    const userMessage = {
      role: "user",
      content: aiMessage,
    };

    setIsThinking(true);

    roosebot?.setMessages((prev) => {
      const hasUserData = prev.some(
        (val) => JSON.stringify(val) === JSON.stringify(userInfo),
      );

      if (hasUserData) {
        return [...prev, userMessage] as AiMessage[];
      } else {
        return [...prev, userInfo, userMessage] as AiMessage[];
      }
    });

    setHasNewMessage(true);
    setAiMessage("");
  };

  const handleNameInput = (e: BaseSyntheticEvent) => {
    setName(e.target.value);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="rounded-md flex flex-col min-h-3/4 max-h-3/4 items-center gap-2 p-4 w-2/4 border-[1px] border-[#0004]">
        <div className="flex px-4 py-3 w-full items-center justify-between border-b-[1px] border-b-[#0002]">
          <h1 className="text-xl font-bold">Fale com o Roosebot!</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Digite seu nome"
              onChange={handleNameInput}
              type="text"
            />
            <Select
              onValueChange={(e) =>
                setRole(e as "cliente" | "funcionario" | "nao especificado")
              }
            >
              <SelectTrigger className="w-3/4">
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cliente">Cliente</SelectItem>
                <SelectItem value="funcionario">Funcionário</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={() => roosebot?.clearChat()}
              className="border-[1px] border-[#0003] bg-transparent text-gray-900 hover:bg-rose-600 hover:text-white"
            >
              <Trash />
            </Button>
          </div>
        </div>
        <div id="message-box" className="rounded-md h-full p-4 w-full">
          <div className="flex flex-col gap-2 p-4 max-h-[70vh] overflow-y-auto">
            {roosebotMessages!.map((message, i) => {
              return (
                <div
                  key={i}
                  className={`
                        max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2
                        ${message.role === "user" ? "self-end bg-blue-500 text-white" : ""}
                        ${message.role === "assistant" ? "self-start bg-gray-100 text-black" : ""}
                        ${message.role === "system" ? "text-xs hidden text-gray-500 text-center" : ""}
                      `}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              );
            })}
          </div>
        </div>
        {isThinking && (
          <div className="flex gap-2 items-center w-full">
            <span className="text-xs text-gray-600">Digitando</span>
            <div className="flex gap-1 animate-pulse">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div className="flex gap-2 items-center w-full">
          <Textarea
            placeholder="Qual a sua dúvida?"
            className="w-full resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmitMessage();
              }
            }}
            value={aiMessage}
            onChange={(e: BaseSyntheticEvent) => setAiMessage(e.target.value)}
          />{" "}
          {!aiMessage ? (
            <Button className="hidden" disabled>
              <ArrowUpFromDot />
            </Button>
          ) : (
            <Button
              onClick={handleSubmitMessage}
              className="cursor-pointer hidden"
            >
              <ArrowUpFromDot />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roosebot;
