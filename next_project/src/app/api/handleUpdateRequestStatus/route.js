import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { reviewerId, requestId, statusId } = body;

    try {
        let { data: req, error } = await supabase
            .from('request')
            .update({ status_id: statusId, req_reviewer: reviewerId })
            .eq('req_id', requestId)
            .select();

        if (error != null) {
            return new Response(error, {
                status: 500,
            });
        }


        return new Response('Status updated successfully', {
            status: 200
        });

    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
