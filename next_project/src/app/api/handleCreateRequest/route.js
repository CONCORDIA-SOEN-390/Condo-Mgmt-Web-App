import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// to fix
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function POST(req) {
    const body = await req.json();
    const { userId, requestTypeId, details, unitId, propertyId } = body;

    const defaultStatusId = 1;

    try {
        // Query to fetch employee information
        const { data: empsData, error: empsError } = await supabase
            .from('employee')
            .select('*')
            .eq('property_id', propertyId);


        if (empsError) {
            throw empsError;
        }


        const shuffledEmpsData = shuffleArray(empsData);


        const reqReviewerId = shuffledEmpsData[0].employee_id;

        await supabase.from('request').insert([
            {
                unit_id: unitId,
                property_id: propertyId,
                req_creator: userId,
                req_reviewer: reqReviewerId,
                type_id: requestTypeId,
                status_id: defaultStatusId,
                details: details
            }
        ]);

        return new Response('Success', {
            status: 200,
        });

    } catch (error) {
        console.error("Error inserting request:", error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
