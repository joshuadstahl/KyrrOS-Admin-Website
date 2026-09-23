// functions/_middleware.js
import stytchPlugin from "@cloudflare/pages-plugin-stytch";
import {envs} from "@cloudflare/pages-plugin-stytch";

// Custom middleware to skip authentication for public routes
async function bypassPublicRoutes({ request, next }) {
  const url = new URL(request.url);

  if (
    url.pathname === '/login' || 
    url.pathname.startsWith('/assets/') || 
    url.pathname === '/api/auth/callback'
  ) {
    return next(); // Skip remaining middleware in the array
  }

  try {
    return await next(); // Proceed to the Stytch plugin validation
  } catch (error) {
    // If Stytch validation fails, redirect to login
    const loginUrl = new URL('/login', url.origin);
    return Response.redirect(loginUrl.toString(), 302);
  }
}

// Helper to initialize the Stytch plugin dynamically using Cloudflare environment variables
function configureStytch(context) {
  const { env } = context;
  
  // Use the plugin directly as a function call inside the chain
  const handler = stytchPlugin({
    project_id: env.STYTCH_PROJECT_ID,
    secret: env.STYTCH_SECRET,
    // Provide your live or test URL endpoint depending on environment
    env: env.STYTCH_ENV === 'public_production' ? envs.live : envs.test 
  });

  return handler(context);
}

// Chain the public route bypass before the Stytch validation engine
export const onRequest = [bypassPublicRoutes, configureStytch];
