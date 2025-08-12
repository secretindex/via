import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
// import { NextApiRequest } from "next";

export async function GET() {
  try {
    const supabase = createClient();
    const { data, error } = await (await supabase).from("tasks").select("*")

    if (error) {
      throw new Error(error.message)
    }

    return NextResponse.json({ taskList: data, status: "ok" })
  } catch (e) {
    console.error(e)
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const newTask = await req.json()

    console.log(newTask)

    const { error } = await (await supabase).from("tasks").insert(newTask)

    if (error) {
      throw new Error(error.message)
    } else {
      return NextResponse.json({ message: "Submitted successfully", status: "ok" })
    }
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: e, status: "fail"})
  }
}
