import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "@src/utils/NavigateTo";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "@src/components/Layout/Layout";
import Header from "@src/components/Header/Header";
import axios from 'axios';
import styles from "@src/pages/RegistrationPage/RegistrationPage.module.scss";

interface User {
  username: string;
  email: string;
  password: string;
}

const initialUserState = {
  username: '',
  email: '',
  password: '',
};

const Register = () => {
  const [user, setUser] = useState<User>(initialUserState);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8081/api/register/';

  function isValidPassword(password: string): boolean {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
  
    return (
      password.length >= 7 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password)
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle registration logic here
    try {
      let dataStorage = JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email
      });

      if (!isValidPassword(user.password)) {
        setErrorPassword(true);
      } else {
        setErrorPassword(false);
      }
      if (!user.email) {
        setErrorEmail(true);
      } else {
        setErrorEmail(false);
      }
      if (!user.username) {
        setErrorUsername(true);
      } else {
        setErrorUsername(false);
      }

      if (errorEmail || errorPassword || errorUsername) {
        return;
      }

      const response = await axios({
          method: 'POST',
          url: baseUrl,
          data: dataStorage,
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.data[0]) {
        setErrorEmail(true);
      } else {
        setErrorEmail(false);
      }
      if (response.data[1]) {
        setErrorUsername(true);
      } else {
        setErrorUsername(false);
      }

      if (!response.data.includes(true)) {
        NavigateTo("/login", navigate, {});
      }
      return response.data;
    } catch (error) {
        console.error(`Error in post Route: ${error}`);
        throw error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Header />
      <Layout>
        <div className={styles.registerForm}>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              value={user.username}
              onChange={handleChange}
              margin="normal"
              error={errorUsername}
              helperText={errorUsername ? 'The desired Username exists already or is invalid' : ''}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              margin="normal"
              error={errorEmail}
              helperText={errorEmail ? 'An account already exists for the specified email or is invalid' : ''}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              margin="normal"
              error={errorPassword}
              helperText={errorPassword ? 'Your Password should contain minimum: 1x Uppercase and Lowercase Letter, 1x Number and minimum 7 Characters' : ''}
            />
            <Button size='large' type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;