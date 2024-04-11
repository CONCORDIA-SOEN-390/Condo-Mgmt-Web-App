import { v4 as uuidv4 } from 'uuid'; // Import UUID library
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export async function POST(req) {
  const body = await req.json();
  const { userId, propertyName, address, numberOfFloors, numberOfUnitsPerFloor, numberOfParkingSpaces, numberOfLockers, propertyType } = body;


  try {
    // Insert data into table1

    const { data, error } = await supabase
    .from('property')
    .insert([
      {user_id: userId, property_name: propertyName, property_type: propertyType, address: address},
    ])
    .select();
    //retrieve property id generated for use in future queries
    const propertyId = data[0]['property_id'];
    let unit_id = "";

      for (let i = 1; i <= numberOfFloors; i++) {
        for (let j = 1; j <= numberOfUnitsPerFloor; j++) {
          
          if (numberOfUnitsPerFloor < 10) {
            unit_id = i + "" + j;
          } else {
            if (j < 10){
              unit_id += i + "0" + j;
            } else {
              unit_id += i + ""+  j;
            }
          }
          //Generation of unique registration key through this call to a library.
          const registrationKey = uuidv4();

          const { data2, error2 } = await supabase
          .from('unit')
          .insert([
            {unit_id: unit_id, property_id: propertyId, owner_id: userId, occupied: 0, registration_key: registrationKey},
          ])
          .select();
          if (error2 != null){
            return new Response(JSON.stringify(error), {
              status:500,
            });
          }
          unit_id = "";
        }
      }

    for (let i = 1; i <= numberOfLockers; i++) {
      const { data3, error3 } = await supabase
      .from('locker')
      .insert([
        {locker_id: i, property_id: propertyId, owner_id: userId, occupied: false},
      ])
      .select();
      if (error3 != null){
        return new Response(JSON.stringify(error), {
          status:500,
        });
      }
    }

    for (let i = 1; i <= numberOfParkingSpaces; i++) {
      const { data4, error4 } = await supabase
      .from('parking')
      .insert([
        {parking_id: i, property_id: propertyId, owner_id: userId, occupied: false},
      ])
      .select();
      if (error4 != null){
        return new Response(JSON.stringify(error), {
          status:500,
        });
      }    
    }

    return new Response('Success',{
      status:200,
    });
  } catch (error) {
    return new Response('Internal Server Errror', {
      status:500,
    });
  }
}
