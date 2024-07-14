import React, { useState, ChangeEvent, FormEvent } from "react";
import { Card, Typography, Input, Checkbox, Button, TextField, FormControlLabel } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register: React.FC = () => {
  // State variables with types
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the inputted values (you can also handle form submission here)
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Agreed to terms:", agreed);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  // Handle input change
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <Card variant="outlined" style={{ padding: "16px", backgroundColor: "transparent" }}>
      <Typography variant="h4" color="textPrimary">
        Sign Up
      </Typography>
      <Typography color="textSecondary" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="textPrimary" className="-mb-3">
            Your Name
          </Typography>
          <TextField size="medium" placeholder="Your Name" variant="outlined" fullWidth value={name} onChange={handleInputChange(setName)} />
          <Typography variant="h6" color="textPrimary" className="-mb-3">
            Your Email
          </Typography>
          <TextField size="medium" placeholder="name@mail.com" variant="outlined" fullWidth value={email} onChange={handleInputChange(setEmail)} />
          <Typography variant="h6" color="textPrimary" className="-mb-3">
            Password
          </Typography>
          <TextField type="password" size="medium" placeholder="********" variant="outlined" fullWidth value={password} onChange={handleInputChange(setPassword)} />
        </div>
        <FormControlLabel
          control={<Checkbox checked={agreed} onChange={(e: ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)} />}
          label={
            <Typography variant="body2" color="textSecondary">
              I agree to the
              <a href="#" className="font-medium transition-colors hover:text-gray-900">
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
        />
        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-6">
          Sign Up
        </Button>
        <Typography color="textSecondary" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
  );
};

export default Register;
