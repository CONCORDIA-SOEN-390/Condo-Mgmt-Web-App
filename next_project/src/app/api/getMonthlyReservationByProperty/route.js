import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { propertyId, year, month } = req.body;

        if (!propertyId || !year || !month) {
            return res.status(400).json({ error: 'Property ID, year, and month are required' });
        }

        const startDate = `${year}-${month}-01T00:00:00Z`;
        const endDate = new Date(year, month, 0, 23, 59, 59).toISOString(); 

        const { data: facilities, error } = await supabase
            .from('facility')
            .select(`
                facility_id,
                name,
                description,
                reservations:reservation_id (
                    reservation_id,
                    start_time,
                    end_time,
                    user_id
                )
            `)
            .eq('property_id', propertyId)
            .filter('reservations.start_time', 'gte', startDate)
            .filter('reservations.end_time', 'lte', endDate);

        if (error) {
            console.error('Error fetching facilities and their reservations:', error);
            return res.status(500).json({ error: 'Failed to fetch facilities and reservations' });
        }

        return res.status(200).json(facilities);
    } catch (error) {
        console.error('Unhandled error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
