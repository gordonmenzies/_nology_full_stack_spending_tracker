import "./Login.scss";
import { useState } from "react";
import { Typography } from "@mui/material";
import Register from "../../../Components/Register/Register";
import SignIn from "../../../Components/SignIn/SignIn";
import { useAuth } from "../../../Components/Context/AuthenticationState";

const Login = () => {
  const { currentUser } = useAuth();
  const [hasAccount, setHasAccount] = useState<Boolean>(true);

  const changeState = () => {
    if (hasAccount == true) {
      setHasAccount(false);
    } else {
      setHasAccount(true);
    }
  };

  return (
    <div className="background">
      {hasAccount == true ? (
        <div>
          <SignIn></SignIn>
          <Typography color="textSecondary" className="mt-4 text-center font-normal">
            First time here?{" "}
            <a href="#" className="font-medium text-gray-900" onClick={() => changeState()}>
              Sign Up
            </a>
          </Typography>
        </div>
      ) : (
        <div>
          <Register></Register>
          <Typography color="textSecondary" className="mt-4 text-center font-normal">
            Return to Sign in{" "}
            <a href="#" className="font-medium text-gray-900" onClick={() => changeState()}>
              Click Here
            </a>
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Login;
