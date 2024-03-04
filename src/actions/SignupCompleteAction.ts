"use server";

import { z } from "zod";


//prettier-ignore
const schema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  phone: z.string().refine(value => /^\d{3}-\d{3}-\d{4}$/.test(value), { message: "Phone number must be in the format 222-222-2222" }),
  userType: z.enum(["individual", "company"]).refine( (value) => ["individual", "company"].includes(value), { message: "User type must be either 'individual' or 'company'" } ),
  profilePicture: z.string().url({ message: "Invalid URL" }),
});

export async function CompleteProfileVerification(prevState: any, formData: FormData) {
  console.log(formData.get("username"));
  console.log(formData.get("phoneNumber"));
  console.log(formData.get("userType"));
  console.log(formData.get("profileUrl"));

  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    phone: formData.get("phoneNumber"),
    userType: formData.get("userType"),
    profilePicture: formData.get("profileUrl"),
  });
  

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  } else {
    console.log(validatedFields);
  }
}
