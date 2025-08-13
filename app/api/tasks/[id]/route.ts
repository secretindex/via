import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function DELETE({ params }: { params: { id: string } }) {
  try {
      const supabase = createClient();

      const { id } = await params

      console.log(id, params)

      const { error } = await (await supabase)
        .from("tasks")
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(error.message);
      } else {
        return NextResponse.json({
          message: "Deleted successfully",
          status: "ok",
        });
      }
  } catch (e) {
    return NextResponse.json({ message: e, status: "fail" });
  }
}
