import pool from "../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId, pageType } = body;
    const client = await pool.connect();
    let allowAccess = false;

    try {
        const user = await client.query("SELECT * FROM users WHERE user_id = $1", [userId]);
        const account_type= user.rows[0]['account_type'];
        switch (account_type){
            case 'company':
                allowAccess = true;
                break;
            case 'management':
                if (pageType != 'properties'){
                    allowAccess = true;
                }
                break;
            case 'finance':
                if (pageType === 'finance'){
                    allowAccess = true;
                }
                break;
            case 'operations':
                if (pageType === 'requests'){
                    allowAccess = true;
                }
                break;
            case 'reg_user':
                allowAccess = true;
                break;
        }
        return new Response(allowAccess,{
            status:200,
        });
    } catch (error) {
        return new Response('Internal Server Error',{
            status:500,
        });
    } finally {
        client.release();
    }
}