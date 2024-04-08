import pool from "../../../utils/db";

export async function POST(req) {
  const body = await req.json();
  const { companyId, value, description, occurence } = body;

  const client = await pool.connect();

  try {
    await client.query("INSERT INTO expense(company_id, expense_value, description, occurence) VALUES ($1, $2, $3, $4)", [companyId, value, description, occurence]);

    return new Response('Success',{
      status:200,
    });
  } catch (error) {
    console.error("Error inserting data into tables:", error);
    return new Response('Internal Server Errror', {
      status:500,
    });
  } finally {
    client.release();
  }
}
