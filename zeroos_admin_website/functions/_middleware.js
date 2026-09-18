// functions/_middleware.js
import stytchPlugin from "@cloudflare/pages-plugin-stytch";
import { envs } from "@cloudflare/pages-plugin-stytch/api";

// 1. Initialise the Stytch authenticator
const authWall = (context) => {
  return stytchPlugin({
    project_id: context.env.STYTCH_PROJECT_ID,
    secret: context.env.STYTCH_PROJECT_SECRET,
    env: context.env.STYTCH_ENV === "live" ? envs.live : envs.test,
  })(context);
};

// 2. Decide what happens if they are not authenticated
const redirectOnFailure = async (context) => {
  // If the previous plugin step validated the user, it puts it into context.data
  if (context.data.stytch?.session) {
    return context.next(); // Let them view the page!
  }

  // If they are visiting the login page itself, let them pass through 
  // so they don't get stuck in a redirect loop
  const url = new URL(context.request.url);
  if (url.pathname === "/login" || url.pathname.startsWith("/api/auth")) {
    return context.next();
  }

  // Otherwise, bounce them instantly to your login page
  return Response.redirect(`${url.origin}/login`, 302);
};

// Chain them together globally across the entire site
export const onRequest = [authWall, redirectOnFailure];
