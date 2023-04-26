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
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8081/api/register/';


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handle registration logic here
    console.log(user);
    try {
      let dataStorage = JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email
      });
      const response = await axios({
          method: 'POST',
          url: baseUrl,
          data: dataStorage,
          headers: {
              'Content-Type': 'application/json',
          },
      });
      return response.data;
  } catch (error) {
      console.error(`Error in post Route: ${error}`);
      throw error;
  }
    // redirect to login page after successful registration
    NavigateTo("/", navigate, {
    })
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
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Register;