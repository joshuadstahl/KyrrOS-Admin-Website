import { Products, StytchLogin } from '@stytch/react';

const config = {
  products: [Products.otp],
  oauthOptions: {
    providers: [{ type: 'google' }],
  },
  otpOptions: {
      methods: ['email'], // Limits OTP strictly to email delivery
      expirationMinutes: 10,
  },
  sessionOptions: {
    sessionDurationMinutes: 60,
  },
};

export const LoginOrSignup = () => {
  return <StytchLogin config={config} />;
};