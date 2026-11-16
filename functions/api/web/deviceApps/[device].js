export async function onRequest(context) { 

    const deviceApps = context.env.kdb.prepare("select apps.id, apps.displayName, apps.imageLink from deviceApps inner join apps on deviceApps.app_id = apps.id inner join devices on deviceApps.device_id = devices.id where devices.owner_id = ? and deviceApps.device_id = ?").bind(context.data.stytchSession.user.user_id, context.params.device);
    const results = await deviceApps.all();
    return new Response(JSON.stringify(results.results), {status: 200, headers: { "Content-Type": "application/json" } });
    
}