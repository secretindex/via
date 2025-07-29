"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpFromDot, Trash } from "lucide-react";
import { BaseSyntheticEvent, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

type MessageType = {role: "user" | "model", parts: [{text: string}]}
type HistoryType = Array<MessageType>

const Roosebot = () => {
  const [aiMessage, setAiMessage] = useState<string>("");
  const [hasNewMessage, setHasNewMessage] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryType>([]);

  const [isThinking, setIsThinking] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<
    "funcionario" | "cliente" | "nao especificado"
  >("nao especificado");

  // const isResponding = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  console.log(history)

  const handleSubmitMessage = async () => {
    const res = await axios.post("/api/gemini", { chatAiHistory: history, message: aiMessage });

    setAiMessage("")

    console.log(res.data);
    setHistory(res.data.history)

    console.log(res.data.history)
  };

  const handleNameInput = (e: BaseSyntheticEvent) => {
    setName(e.target.value);
  };

  return (
    <div className="w-full flex flex-col h-screen h-max-screen justify-center items-center">
      <div className="rounded-md flex flex-col min-h-3/4 max-h-3/4 items-center gap-2 p-4 w-3/4 border-[1px] border-[#0004]">
        <div className="flex px-4 py-3 w-full items-center justify-between border-b-[1px] border-b-[#0002]">
          <h1 className="text-xl font-bold">Fale com o Geminibot!</h1>
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
              onClick={() => setHistory([])}
              className="border-[1px] border-[#0003] bg-transparent text-gray-900 hover:bg-rose-600 hover:text-white"
            >
              <Trash />
            </Button>
          </div>
        </div>
        <div
          id="message-box"
          className="rounded-md h-full max-h-full overflow-auto p-4 w-full"
        >
          <div className="flex flex-col gap-2 p-4 max-h-full overflow-y-auto">
            {history!.map((message, i) => {
              return (
                <div
                  key={i}
                  className={`
                        max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2
                        ${
                          message.role === "user"
                            ? "self-end bg-blue-500 text-white"
                            : ""
                        }
                        ${
                          message.role === "model"
                            ? "self-start bg-gray-100 text-black"
                            : ""
                        }
                      `}
                >
                  <ReactMarkdown>{message.parts[0].text as string}</ReactMarkdown>
                </div>
              );
            })}
            <div ref={bottomRef} />
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
