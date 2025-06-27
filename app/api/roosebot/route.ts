import { NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenAI } from "@google/genai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY as string,
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export async function POST(req: Request) {
  try {
    const { chatAiMessages } = await req.json();

    console.log("this is from API", chatAiMessages);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528:free",
      messages: chatAiMessages,
    });

    console.log(completion);

    return NextResponse.json({ answer: completion.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
