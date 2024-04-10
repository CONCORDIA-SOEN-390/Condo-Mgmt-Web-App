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

        let { data : req, error } = await supabase
        .from('request')
        .update({status_id: statusId, req_reviewer: reviewerId})
        .eq('req_id', requestId)
        .select();

        if (error != null){
            return new Response(error, {
              status:500,
            });
        }

        // update the request status
        //await client.query("UPDATE request SET status_id = $1, req_reviewer = $2 WHERE req_id = $3", [statusId, null, requestId]);

        let { data: numOfAssignedReq, error2 } = await supabase
        .from('employee')
        .select('num_of_assigned_req')
        .eq('employee_id', reviewerId);

        if (error2 != null){
            return new Response(error, {
              status:500,
            });
        }

        let { data : e, error3 } = await supabase
        .from('employee')
        .update({num_of_assigned_req: numOfAssignedReq[0]['num_of_assigned_req'] - 1})
        .eq('employee_id', reviewerId)
        .select();

        if (error3 != null){
            return new Response(error, {
              status:500,
            });
        }
        // update the employee to decrease their assigned req count
        //await client.query("UPDATE employee SET num_of_assigned_req = num_of_assigned_req - 1 WHERE employee_id = $1", [reviewerId]);

        return new Response('Status updated successfully', {
            status: 200
        });

    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
