import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const { companyId, value, description, occurence, date, propertyId } = body;

  try {
    const { data, error } = await supabase
  .from('expense')
  .insert([
    { company_id: companyId, expense_value: value, occurence: occurence, description: description, expense_date: date, property_id: propertyId },
  ])
  .select();

  if (error != null){
    return new Response(JSON.stringify(error), {
      status:500,
    });
  }

    return new Response('Success',{
      status:200,
    });
  } catch (error) {
    console.error("Error inserting data into tables:", error);
    return new Response('Internal Server Errror', {
      status:500,
    });
  }
}
