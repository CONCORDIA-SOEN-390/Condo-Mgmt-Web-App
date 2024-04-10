import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response("Missing Parameter", {
      status: 400,
    });
  }

  try {
    // Execute custom SQL query to fetch user by email
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password_', password);
    if (error || !users || password !== users[0].password_) {
      return new Response("Invalid Credentials", {
        status: 401,
      });
    } else {
      const userData = {
        id: users[0].id,
        email: users[0].email,
        profileUrl: users[0].profile_picture_url,
        accountType: users[0].account_type,
        phoneNumber: users[0].phone_number,
        userName: users[0].username,
      };
      if (error != null){
        return new Response(JSON.stringify(error), {
          status:500,
        });
      }
      return new Response(JSON.stringify(userData), { status: 200 });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
