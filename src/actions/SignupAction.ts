"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

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
  } else {
    
    redirect("/signup/complete");
  }
}
