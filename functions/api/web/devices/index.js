export async function onRequest(context) { 

    const ownerID = context.data.stytchUser.user_id;
    const devices = context.env.kdb.prepare("select name, id, imei from devices where owner_id = ?").bind(ownerID);
    const results = await devices.all();
    return new Response(JSON.stringify(results.results), {status: 200, headers: { "Content-Type": "application/json" } });
    
}