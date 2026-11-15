import stytch from "stytch";

//purpose of this middleware: to force authentication before actions can be taken
//or data received.

export async function onRequest(context) {

    // 1. Parse cookies from the context.request header
    const cookieHeader = context.request.headers.get('Cookie') || '';
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => c.trim().split('='))
    );
    
    const sessionToken = cookies['stytch_session'];

    if (!sessionToken) {
        return new Response(JSON.stringify({ error: 'Unauthorized: No session cookie found' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
        });
    }

    // 2. Initialize Stytch Client
    const client = new stytch.Client({
        project_id: context.env.STYTCH_PROJECT_ID,
        secret: context.env.STYTCH_SECRET,
        env: stytch.envs.live, // or stytch.envs.live
    });

    try {
        // 3. Authenticate session token
        const sessionResponse = await client.sessions.authenticate({
        session_token: sessionToken,
        });

        // 4. Put user data into context.data so downstream endpoints can use it instantly
        context.data.stytchSession = sessionResponse;

        // Continue down the folder path to the actual endpoint
        return context.next();

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Unauthorized: Invalid session cookie', details: error.message }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
        });
    }
}