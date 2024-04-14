"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import pool from "@/utils/db";

//prettier-ignore
const schema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z .string() .min(8, { message: "Password must be at least 8 characters long" }) .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/, { message: "Password must contain at least 1 number, 1 special character, and 1 capital letter" }),
});

export async function verifyUserSignUp(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  const client = await pool.connect();
  let redirectPath = null;

  try {
    await client.query("BEGIN");
    const userExistsResult = await client.query("SELECT user_id FROM users WHERE email = $1", [email]);

    if (userExistsResult.rows.length > 0) {
      await client.query("ROLLBACK");
      return { message: "Email already exists" };
    }
    await client.query("INSERT INTO users (email, password_) VALUES ($1, $2) RETURNING user_id", [email, password]);
    await client.query("COMMIT");
    redirectPath = "/signup/complete";
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error in user signup:", error);
    // Handle database errors
    return { message: "Database error" };
  } finally {
    client.release();
    if (redirectPath) {
      redirect(`${redirectPath}?email=${email}`);
    }
  }
}
