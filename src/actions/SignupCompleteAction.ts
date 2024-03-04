"use server";

import { z } from "zod";
import pool from "@/../utils/db";



//prettier-ignore
const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  phone: z.string().refine(value => /^\d{3}-\d{3}-\d{4}$/.test(value), { message: "Phone number must be in the format 222-222-2222" }),
  userType: z.enum(["individual", "company"]).refine( (value) => ["individual", "company"].includes(value), { message: "User type must be either 'individual' or 'company'" } ),
});

export async function CompleteProfileVerification(prevState: any, formData: FormData) {

  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    phone: formData.get("phoneNumber"),
    userType: formData.get("userType"),
  });
  

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    console.log(validatedFields);
    //DB calls here with VALIDATEDFIELDS
  }
}
