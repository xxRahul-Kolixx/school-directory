// app/api/schools/add/route.js
import db from "@/lib/db";

// API route handler for POST /api/schools/add
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, address, city, state, contact, image, email_id } = body;

    // basic validation
    if (!name || !address || !city || !email_id) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // insert into DB
    const [result] = await db.execute(
      `INSERT INTO schools (name, address, city, state, contact, image, email_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        address,
        city,
        state || null,
        contact || null,
        image || null,
        email_id,
      ]
    );

    return new Response(
      JSON.stringify({
        message: "School added successfully",
        id: result.insertId,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
