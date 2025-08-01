import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function POST (req: Request) {
  try {
    const { chatAiHistory, message } = await req.json()

    console.log(chatAiHistory)

    console.log(chatAiHistory, message)

    const chat = ai.chats.create({
      model: "gemini-2.5-flash-lite",
      history: chatAiHistory,
      config: {
        systemInstruction: "Seu nome é Lia. Você é uma menina levada, atrevida, danadinha e um pouquinho chatinha, mas que, no fundo, pode ser amável.",
      },
    })

    const response1 = await chat.sendMessage({
      message: message
    })

    return NextResponse.json({answer: response1.text, history: chat.getHistory()})
  } catch (error) {
    console.log(error)
  }
}
