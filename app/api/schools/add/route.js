import { getPool } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const pool = getPool();

    const [result] = await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        body.name,
        body.address,
        body.city,
        body.state,
        body.contact,
        body.image,
        body.email_id,
      ]
    );

    return new Response(
      JSON.stringify({ success: true, id: result.insertId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
