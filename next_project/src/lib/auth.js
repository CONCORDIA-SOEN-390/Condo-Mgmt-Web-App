import NextAuth from "next-auth";
//import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import * as z from "zod";
import { createClient } from "@supabase/supabase-js";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const LoginSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().optional(),
  firstSignIn: z.boolean(),
});

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const firstSignIn = credentials.firstSignIn === "true" || credentials.firstSignIn === true;
        const validatedFields = LoginSchema.safeParse({ email: credentials.email, password: credentials.password, firstSignIn: firstSignIn });
        if (validatedFields.success) {
          const { email, password, firstSignIn } = validatedFields.data;
          try {
            const { data: user, error } = await supabase.from("users").select("*").eq("email", email).single();

            if (error || !user || (!firstSignIn && password !== user.password_)) {
              return null;
            }

            return user;
          } catch (error) {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token }) {
      const { data: user, error } = await supabase.from("users").select("*").eq("email", token.email).single();
      token.user_id = user.user_id;
      token.username = user.username;
      token.phone_number = user.phone_number;
      token.profile_picture_url = user.profile_picture_url;
      token.account_type = user.account_type;
      // console.log({token:token})
      // token.sub = user.user_id
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore comment
      session.user.user_id = token.user_id;
      // @ts-ignore comment
      session.user.username = token.username;
      // @ts-ignore comment
      session.user.phone_number = token.phone_number;
      // @ts-ignore comment
      session.user.profile_picture_url = token.profile_picture_url;
      // @ts-ignore comment
      session.user.account_type = token.account_type;
      return session;
    },
  },
});
