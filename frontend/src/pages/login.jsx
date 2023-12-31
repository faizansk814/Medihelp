import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoginUser } from "../redux/authreducer/action";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setuser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const res = await dispatch(LoginUser(user));
    if (res.msg === "Login successful") {
      toast.success(res.msg);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(res.msg);
    }
  };
  return (
    <Box p={4} maxW="400px" m="auto" mt={"32"}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Heading as="h2" size="xl" mb={6}>
        Login
      </Heading>
      <form onSubmit={handleClick}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              value={user.email}
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              value={user.password}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Login
          </Button>
        </Stack>
      </form>

      <Text mt={4} textAlign="center">
        Don't Have an Account? <a href="/register">Register</a>
      </Text>
    </Box>
  );
}

export default Login;
