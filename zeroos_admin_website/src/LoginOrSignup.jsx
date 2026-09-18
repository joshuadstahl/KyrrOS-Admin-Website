import { Products, StytchLogin } from '@stytch/react';

const config = {
  products: [Products.emailMagicLinks, Products.oauth],
  oauthOptions: {
    providers: [{ type: 'google' }],
  },
  sessionOptions: {
    sessionDurationMinutes: 60,
  },
};

export const LoginOrSignup = () => {
  return <StytchLogin config={config} />;
};