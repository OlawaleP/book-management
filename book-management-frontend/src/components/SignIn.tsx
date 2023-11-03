import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Implement the logic to send the sign-in data to your backend (API call).
    // Use Auth0 or any other authentication service you are using.
  };

  return (
    <Center height="100vh">
      <Box borderWidth="1px" p={8} maxWidth="400px" width="100%">
      <Center>
      <h1>Sign In</h1>
      </Center>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>
          <Center>
          <Button colorScheme="blue" mt={4} type="submit">
            Sign In
          </Button>
        </Center>
        </form>
      </Box>
    </Center>
  );
}

export default SignIn;
