import { useStytchSession, useStytch } from "@stytch/react";
import { Navigate } from "react-router";

export const Logout = () => {
  const stytch = useStytch();
  const {session} = useStytchSession();


  const handleLogout = async () =>{
    try {
        await stytch.session.revoke();
        return <Navigate to="/login" />;
    }
    catch (error) {
        console.error("Error occurred while revoking session:", error);
    }    
  }

  if (session) {
    return (<button onClick={handleLogout}>
      Log Out
    </button>)
  }
  else {
    return <Navigate to="/login" />;
  }
};