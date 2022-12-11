import { Button, FormControl, Heading, Input, Stack, View } from "native-base";
import React from "react";

function Login() {
  return (
    <View
      p={"10"}
      bg={"gray.800"}
      flex={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading color={"white"} size={"2xl"}>
        Hi, please login
      </Heading>
      <FormControl my={"4"} isRequired>
        <Stack>
          <FormControl.Label>Username</FormControl.Label>
          <Input color={"white"} placeholder="Username" />
        </Stack>
      </FormControl>
      <FormControl isRequired my={"4"}>
        <Stack>
          <FormControl.Label>Password</FormControl.Label>
          <Input color={"white"} type="password" placeholder="Password" />
          <FormControl.HelperText>
            Must be at least 8 characters.
          </FormControl.HelperText>
        </Stack>
      </FormControl>
      <Button colorScheme={"purple"}>LOGIN</Button>
    </View>
  );
}

export default Login;
