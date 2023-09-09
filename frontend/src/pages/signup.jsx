import { useState } from "react"
import { useDispatch } from "react-redux"
import { RegisterUser } from "../redux/authreducer/action"
import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    Text,
} from '@chakra-ui/react';

function Signup() {
    const [user, setuser] = useState({ username: "", email: "", password: "" })
    const dispatch = useDispatch()
    const handleClick = async (e) => {
        e.preventDefault()
        const res = await dispatch(RegisterUser(user))
        console.log(res)
    }
    return (
        <Box p={4} maxW="400px" m="auto" mt={'32'}>
            <Heading as="h2" size="xl" mb={6}>
                Signup
            </Heading>
            <form onSubmit={handleClick}>
                <Stack spacing={4}>
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder="Enter your username" onChange={(e)=>setuser({...user,username:e.target.value})} />
                    </FormControl>

                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" placeholder="Enter your email" onChange={(e)=>setuser({...user,email:e.target.value})} />
                    </FormControl>

                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Enter your password" onChange={(e)=>setuser({...user,password:e.target.value})} />
                    </FormControl>

                    <Button type="submit" colorScheme="blue">
                        Sign Up
                    </Button>
                </Stack>
            </form>

            <Text mt={4} textAlign="center">
                Already have an account? <a href="/login">Login</a>
            </Text>
        </Box>
    )

}

export default Signup