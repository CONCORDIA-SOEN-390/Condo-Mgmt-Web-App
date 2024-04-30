"use server";

import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth"

export async function loginAction(prevState: any, formData: FormData) {
  console.log("hello");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
  try{
    await signIn("credentials", { redirectTo: "/properties",email, password, firstSignIn: false  });
  }
  catch (error) {
    console.error("phone login: ", error)
    if (error instanceof AuthError) {
      return { errors: "error", message: "Incorrect Information", status: 401 }
    }

    throw error
  }
  
 
}
