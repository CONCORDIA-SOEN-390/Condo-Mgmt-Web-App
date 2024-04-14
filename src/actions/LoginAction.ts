"use server";

import { signIn } from "@/lib/auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function loginAction(formData: FormData) {
  console.log("hello");
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
  await signIn("credentials", { redirectTo: "/properties",email, password, firstSignIn: false  });
 
}
