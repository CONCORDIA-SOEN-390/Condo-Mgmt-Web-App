"use server";

import { signOut } from "@/lib/auth";


export async function signOutAction() {
  console.log("hello");
  
await signOut({redirectTo: "/"});
 
 
}
