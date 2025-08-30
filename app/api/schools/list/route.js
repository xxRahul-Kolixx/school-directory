// app/api/schools/list/route.js
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC"
    );

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
