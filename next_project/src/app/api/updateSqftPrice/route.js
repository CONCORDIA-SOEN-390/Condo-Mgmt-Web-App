import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { propertyId, unitId, sqft, pricePerSqft } = body;

    try {
        
        if (sqft > 0 && pricePerSqft > 0){
            let { data : res, error } = await supabase
            .from('unit')
            .update({square_footage: sqft, price_per_square_foot: pricePerSqft})
            .eq('unit_id', unitId)
            .eq('property_id', propertyId)
            .select();

            if (error != null){
                return new Response(error, {
                status:500,
                });
            }
            return new Response('Price updated successfully', {
                status: 200
            });
        } else {
            return new Response('Invalid square footage or price', {
                status: 400,
            });
        }
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
