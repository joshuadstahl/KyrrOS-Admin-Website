export async function onRequest(context) { 

    const devices = context.env.kdb.prepare("select name, id, imei from devices where owner_id = ?").bind(context.data.stytchSession.user.user_id);
    const results = await devices.all();
    return new Response(JSON.stringify(results.results), {status: 200, headers: { "Content-Type": "application/json" } });
    
}