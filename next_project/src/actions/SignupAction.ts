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
  }
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    fetch('/api/signupstepone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
    // Redirect only if the request was successful
    redirect("/signup/complete");
  } catch (error) {
    console.error('Error:', error);
    // Handle client-side errors or failed fetch request
    // For example, you can show an error message to the user
    return {
      errors: {
        server: 'Failed to sign up. Please try again later.'
      }
    };
  }
}

