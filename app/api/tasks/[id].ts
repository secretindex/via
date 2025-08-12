import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { NextApiRequest } from "next";

export default async function handler(req: NextApiRequest) {
  try {
    if (req.method === "DELETE") {
      const supabase = createClient();
      const slug = req.query;

      console.log(slug, req.query);

      const { error } = await (await supabase)
        .from("tasks")
        .delete()
        .eq("id", slug);

      if (error) {
        throw new Error(error.message);
      } else {
        return NextResponse.json({
          message: "Deleted successfully",
          status: "ok",
        });
      }
    }
  } catch (e) {
    return NextResponse.json({ message: e, status: "fail" });
  }
}
