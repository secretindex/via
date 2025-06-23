import { NextResponse } from "next/server";
import { openai } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    console.log(question);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });
    return NextResponse.json({ answer: completion.choices[0].message });
  } catch (error: any) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
