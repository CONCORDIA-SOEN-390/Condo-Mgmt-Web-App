"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

//prettier-ignore
const schema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z .string() .min(8, { message: "Password must be at least 8 characters long" }) .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/, { message: "Password must contain at least 1 number, 1 special character, and 1 capital letter" }),
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function verifyUserSignUp(prevState, formData) {
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

  let redirectPath = null;

  try {
    const { data: user, error } = await supabase.from("users").select("*").eq("email", email);

    if (user.length > 0) {
      return { message: "Email already exists" };
    }
    const { data, error2 } = await supabase
      .from("users")
      .insert([{ email: email, password_: password }])
      .select();
    redirectPath = "/signup/complete";
  } catch (error) {
    console.error("Error in user signup:", error);
    // Handle database errors
    return { message: "Database error" };
  } finally {
    if (redirectPath) {
      redirect(`${redirectPath}?email=${email}`);
    }
  }
}
