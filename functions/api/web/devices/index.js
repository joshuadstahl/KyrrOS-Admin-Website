export async function onRequest(context) { 

    //const ownerID = context.data.stytchSession.user_id;
    //console.log(context.data);
    const devices = context.env.kdb.prepare("select name, id, imei from devices where owner_id = ?").bind(context.data.stytchSession.user_id);
    const results = await devices.all();
    return new Response(JSON.stringify(results.results), {status: 200, headers: { "Content-Type": "application/json" } });
    
}