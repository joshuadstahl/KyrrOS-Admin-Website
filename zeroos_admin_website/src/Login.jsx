import { useStytchSession } from "@stytch/react";
//import { Navigate } from "react-router";
import { LoginOrSignup } from "./LoginOrSignup";

export const Login = () => {
  const { session } = useStytchSession();

  if (session) {
    return <h1>Welcome back!</h1>;
  }

  return <LoginOrSignup />;
};