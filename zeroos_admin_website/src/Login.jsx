import { useStytchSession } from "@stytch/react";
import { Navigate } from "react-router";
import { LoginOrSignup } from "./LoginOrSignup";

export const Login = () => {
  const { session } = useStytchSession();

  if (session) {
    return <Navigate to="/home" />;
  }

  return <LoginOrSignup />;
};