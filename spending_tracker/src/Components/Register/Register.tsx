import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Card, Typography, Button, TextField } from "@mui/material";
import { doCreateUSerWithEmailAndPassword, doSignInWithEmailAndPassword } from "../Context/auth";
import { GlobalContext } from "../Context/GlobalState";

const Register: React.FC = () => {
  // State variables with types
  const [firstName, setFirstName] = useState<string>("");
  const [secondName, setSecondName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerComplete, setRegisterComplete] = useState(false);

  const { createNewUser } = useContext(GlobalContext);

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the inputted values (you can also handle form submission here)
    console.log("Name:", firstName + secondName);
    console.log("Email:", email);
    console.log("Password:", password);

    if (!isRegistering) {
      try {
        setIsRegistering(true);
        const newUser = await doCreateUSerWithEmailAndPassword(email, password);
        const user = {
          id: newUser.user.uid,
          firstName: firstName,
          secondName: secondName,
          password: password,
          email: email,
          transactions: [],
          categoryList: ["food", "income", "entertainment", "utilties", "car", "house", "work", "subscription"],
        };
        createNewUser(user);
        console.log("try executed");
      } catch (error) {
        // Handle the error as needed
      }
      console.log("user created");
      await doSignInWithEmailAndPassword(email, password);
      setRegisterComplete(true);
    } else {
      console.log("user not able to be created");
    }
  };

  // Handle input change
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <>
      {registerComplete && <Navigate to={"/home"} replace={true} />}
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
              Your First Name
            </Typography>
            <TextField size="medium" placeholder="first name" variant="outlined" fullWidth value={firstName} onChange={handleInputChange(setFirstName)} />
            <Typography variant="h6" color="textPrimary" className="-mb-3">
              Your Second Name
            </Typography>
            <TextField size="medium" placeholder="second name" variant="outlined" fullWidth value={secondName} onChange={handleInputChange(setSecondName)} />
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
            Sign Up
          </Button>
        </form>
      </Card>
    </>
  );
};

export default Register;
