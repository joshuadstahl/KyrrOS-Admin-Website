console.log("file loaded");

import { useStytchSession } from "@stytch/react";
import { Navigate } from "react-router";
import { LoginOrSignup } from "./LoginOrSignup";

console.log("made it past imports");

export const Login = () => {
  const { session } = useStytchSession();

  console.log("Made it past session check");

  if (session) {
    
    //return <Navigate to="/" />;
    return <h1>Already logged in</h1>;
  }

  return <LoginOrSignup />;
};