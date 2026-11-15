export async function onRequest(context) { 

    const apps = context.env.kdb.prepare("select id, displayName, imageLink from apps");
    const results = await apps.all();
    return new Response(JSON.stringify(results.results), {status: 200, headers: { "Content-Type": "application/json" } });
    
}
