import NextAuth from "next-auth";
//import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import pool from "@/utils/db";
import * as z from "zod"
import PostgresAdapter from "@auth/pg-adapter"


const LoginSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().optional(),
  firstSignIn: z.boolean()
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PostgresAdapter(pool),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const firstSignIn = credentials.firstSignIn === 'true' || credentials.firstSignIn === true;
        const validatedFields = LoginSchema.safeParse({email:credentials.email, password:credentials.password, firstSignIn: firstSignIn});
        if (validatedFields.success) {
          const { email, password, firstSignIn } = validatedFields.data;
          const client = await pool.connect();
          try {
            const user = await client.query("SELECT * FROM users WHERE email=$1", [email]);
            if (user.rowCount !== 1 || (!firstSignIn && password !== user.rows[0].password_)) {
              return null;
            }
            //console.log(user.rows[0])
            return user.rows[0];
            
          } catch (error) {
            return null;
          } finally {
            client.release();
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
    async jwt({token}) {
      const client = await pool.connect();
      const user = await client.query("SELECT * FROM users WHERE email=$1", [token.email]);
      token.user_id = user.rows[0].user_id;
      token.username = user.rows[0].username;
      token.phone_number = user.rows[0].phone_number;
      token.profile_picture_url = user.rows[0].profile_picture_url;
      token.account_type = user.rows[0].account_type;
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

