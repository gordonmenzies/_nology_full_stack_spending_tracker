import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, Typography, Input, Checkbox, Button, TextField, FormControlLabel } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const SignIn: React.FC = () => {
  // State variables with types
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the inputted values (you can also handle form submission here)
    console.log("Email:", email);
    console.log("Password:", password);

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // Handle input change
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
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
  );
};

export default SignIn;
