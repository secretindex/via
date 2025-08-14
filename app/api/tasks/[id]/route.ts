import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const supabase = createClient();
    const { id } = await params;

    const numId = Number(id)

    console.log(typeof numId)

    const { error } = await (await supabase)
      .from("tasks")
      .delete()
      .eq("id", numId);

    if (error) {
      throw new Error(error.message);
    } else {
      return NextResponse.json({
        message: "Successfully deleted task",
        status: "ok",
      });
    }
  } catch (error) {
    return NextResponse.json({ message: error, status: "fail" });
  }
}

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params
  } catch (error) {
    
  }
}
