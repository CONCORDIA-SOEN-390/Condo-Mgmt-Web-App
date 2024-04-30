import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'UserId is required' });
        }

        // Query Supabase for specific unit details and associated property and user (company) details
        const { data: units, error } = await supabase
            .from('unit')
            .select(`
                unit_id,
                property_id,
                square_footage,
                condo_fee,
                property:property_id (
                    property_name,
                    address,
                    property_type,
                    user_id: company_id,
                )
            `)
            .eq('owner_id', userId);

        if (error) {
            console.error('Error fetching units and property details:', error);
            return res.status(500).json({ error: 'Failed to fetch units and property details' });
        }

        return res.status(200).json(units);
    } catch (error) {
        console.error('Unhandled error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
