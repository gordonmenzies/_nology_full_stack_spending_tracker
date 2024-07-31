import React, { useState, ChangeEvent, FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Card, Typography, Button, TextField } from "@mui/material";
import { useAuth } from "../Context/AuthenticationState";
import { doSignInWithEmailAndPassword } from "../Context/auth";

const SignIn = () => {
  const { userLoggedIn, currentUser, setCurrentUser } = useAuth();

  // State variables with types
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningin, setIsSigningIn] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the inputted values (you can also handle form submission here)
    console.log("Email:", email);
    console.log("Password:", password);

    if (!isSigningin) {
      try {
        setIsSigningIn(true);
        const userCredential = await doSignInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        console.log(user);
        console.log(userLoggedIn);
        setCurrentUser(user);
      } catch (error) {
        const errorCode = (error as any).code;
        const errorMessage = (error as any).message;
        // Handle the error as needed
      }
      console.log("user signed in");
      console.log(currentUser);
    } else {
      console.log("user already signed in");
    }
  };

  // Handle input change
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <Card variant="outlined" style={{ padding: "16px", backgroundColor: "transparent" }}>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="textPrimary" className="-mb-3">
              Your Email
            </Typography>
            <TextField size="medium" placeholder="name@mail.com" variant="outlined" fullWidth value={email} onChange={handleInputChange(setEmail)} />
            <Typography variant="h6" color="textPrimary" className="-mb-3">
              Password
            </Typography>
            <TextField type="password" size="medium" placeholder="********" variant="outlined" fullWidth value={password} onChange={handleInputChange(setPassword)} />
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth className="mt-6">
            Sign In
          </Button>
        </form>
      </Card>
    </>
  );
};

export default SignIn;
