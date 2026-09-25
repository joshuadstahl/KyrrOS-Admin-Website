// functions/_middleware.js
import stytchPlugin from "@cloudflare/pages-plugin-stytch";
import {envs} from "@cloudflare/pages-plugin-stytch/api";

// Custom middleware to skip authentication for public routes
async function bypassPublicRoutes(context) {
  const url = new URL(context.request.url);

  console.log(context.data.stytch?.user);

  if (
    url.pathname === '/login' || 
    url.pathname.startsWith('/assets/') || 
    url.pathname === '/api/auth/callback' ||
    url.pathname === '/authenticate'
  ) {
    console.log("Continuing on same page");
    return context.next(); // Skip remaining middleware in the array
  }
  else {
    console.log("Bypassing public route");
    const loginUrl = new URL('/login', url.origin);
    return Response.redirect(loginUrl.toString(), 302);
  }
}

//Helper to initialize the Stytch plugin dynamically using Cloudflare environment variables
function configureStytch(context) {
  const { env } = context;
  
  context.env = context.env || {};
  context.env.STYTCH_PROJECT_ID = env.STYTCH_PROJECT_ID;
  context.env.STYTCH_SECRET = env.STYTCH_SECRET;

  // Use the plugin directly as a function call inside the chain
  const stytch = stytchPlugin({
    project_id: context.env.STYTCH_PROJECT_ID,
    secret: context.env.STYTCH_SECRET,
    env: envs.live,
  })(context);

  console.log(stytch);

  return context.next();

}

// Chain the public route bypass before the Stytch validation engine
export const onRequest = [configureStytch, bypassPublicRoutes];
