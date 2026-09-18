import { useStytchSession } from "@stytch/react";
import { Navigate } from "react-router";
import { LoginOrSignup } from "./LoginOrSignup";

export const Login = () => {
  const { session } = useStytchSession();

  if (session) {
    //return <Navigate to="/" />;
    return <h1>Already logged in</h1>;
  }

  return <LoginOrSignup />;
};