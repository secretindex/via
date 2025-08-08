import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises"
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function POST (req: Request) {
  try {
    const { chatAiHistory, message } = await req.json()
    const filePath = path.join(process.cwd(), "public", "instructions.txt")
    const instructions = await fs.readFile(filePath, "utf-8")
    
    // Add database file information collection - supabase or mongodb (mongodb preferred)

    const chat = ai.chats.create({
      model: "gemini-2.5-flash-lite",
      history: chatAiHistory,
      config: {
        systemInstruction: instructions,
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
