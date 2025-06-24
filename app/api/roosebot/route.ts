import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY as string,
});

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    console.log(question);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "system",
          content: `Você é o Roosebot, um assistente virtual carismático e direto.
          Sempre fale em português do Brasil. Use gírias leves, seja simpático e divertido,
          mas sempre forneça respostas corretas sobre o sistema da empresa. Voce é o bot que tem o
          nome do patrão da empresa.`,
        },
        {
          role: "user",
          content: question,
        },
      ],
    });

    console.log(completion.choices);

    return NextResponse.json({ answer: completion.choices[0].message.content });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
