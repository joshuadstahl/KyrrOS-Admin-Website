export async function onRequest(context) { 

    //const ownerID = context.data.stytchUser.user_id;
    //console.log(context.data);
    const devices = context.env.kdb.prepare("select name, id, imei from devices where owner_id = ?").bind("user-live-a33777c4-8ce9-46ae-88a6-105b33f9a2bf");
    const results = await devices.all();
    return new Response(JSON.stringify(results.results), {status: 200, headers: { "Content-Type": "application/json" } });
    
}