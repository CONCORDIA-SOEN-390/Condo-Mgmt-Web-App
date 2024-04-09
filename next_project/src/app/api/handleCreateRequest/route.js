import pool from "../../../../utils/db";

// used in request components
export async function POST(req){
    const body = await req.json();
    const { userId, requestTypeId, details, unitId, propertyId } = body;

    const defaultStatusId = 1;
    const client = await pool.connect();
    let employee_type;
    let employee_id;

    try {
        await client.query("BEGIN"); // Start the transaction

        const emps = await client.query(`
        SELECT e.*, u.account_type
        FROM employee e
        JOIN property p ON e.company_id = p.user_id
        JOIN users u ON u.user_id = e.employee_id
        WHERE p.property_id = $1;        
        `, [propertyId]);

        const req = await client.query(`
        SELECT * FROM request_type WHERE type_id = $1
        `, [requestTypeId]);

        const req_type = req.rows[0]['type_name']

        if (req_type === "Move In" || req_type === "Move Out" || req_type === "Change intercom number"){
          employee_type = 'operations';
        } else {
          employee_type = 'management';
        }

        const e = await client.query(`
        SELECT * FROM employee e
        JOIN users u ON u.user_id = e.employee_id
        JOIN property p ON p.property_id = e.property_id
        WHERE u.account_type = $1 AND p.property_id = $2
        ORDER BY e.num_of_assigned_req ASC
        LIMIT 1;
        `, [employee_type, propertyId]);

        if (e.rows.length > 0){
          employee_id = e.rows[0]['employee_id'];
          await client.query("UPDATE employee SET num_of_assigned_req = num_of_assigned_req + 1 WHERE employee_id = $1", [employee_id]);
        } else {
          return new Response('No employees can handle this request', {
            status:400,
          })
        }
        await client.query("INSERT INTO request (unit_id, property_id, req_creator, req_reviewer, type_id, status_id, details) VALUES ($1, $2, $3, $4, $5, $6, $7)", [unitId, propertyId, userId, employee_id, requestTypeId, defaultStatusId, details]);
        await client.query("COMMIT");
        return new Response('Success',{
            status:200,
        });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
        console.error("Error inserting data into tables:", error);
        return new Response('Internal Server Errror', {
          status:500,
        });
      } finally {
        client.release();
      }
}