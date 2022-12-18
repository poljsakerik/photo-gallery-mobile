import { useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import {
  Button,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useCurrentUser } from "../../components/AuthContext";
import { loginUser } from "./helper/api";
import { LoginParams, validateLogin } from "./helper/helper";

function Login() {
  const { login } = useCurrentUser();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [validationData, setValidationData] = useState({
    username: [] as string[],
    password: [] as string[],
  });
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigation();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (e) => {
      login(e.data);
      // @ts-expect-error
      navigate.navigate("home");
    },
    onError: (e) => {
      if (e instanceof AxiosError) {
        console.error(e.response);
        setGeneralError(
          e.response?.data.error ?? "Incorrect username or password"
        );
      }
    },
  });

  function onChangeUserData(key: keyof LoginParams) {
    return (e: string) => {
      const newData = { ...userData };
      newData[key] = e;
      setUserData(newData);
    };
  }

  function onSubmit() {
    const newValidationData = validateLogin(userData);
    const valid = Object.keys(newValidationData).reduce((acc, key) => {
      return (
        acc &&
        newValidationData[key as keyof typeof newValidationData].length === 0
      );
    }, true);
    console.log({ newValidationData });
    if (valid) {
      generalError && setGeneralError("");
      setValidationData({
        username: [] as string[],
        password: [] as string[],
      });
      mutate(userData);
    } else {
      setValidationData(newValidationData);
    }
  }
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
      {generalError && <Text color={"error.500"}>{generalError}</Text>}
      <FormControl
        isInvalid={validationData.username.length > 0}
        my={"4"}
        isRequired
      >
        <Stack>
          <FormControl.Label>Username</FormControl.Label>
          <Input
            onChangeText={onChangeUserData("username")}
            color={"white"}
            placeholder="Username"
          />
          <FormControl.ErrorMessage>
            {validationData.username[0]}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl
        isInvalid={validationData.password.length > 0}
        isRequired
        my={"4"}
      >
        <Stack>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            onChangeText={onChangeUserData("password")}
            color={"white"}
            type="password"
            placeholder="Password"
          />
          <FormControl.ErrorMessage>
            {validationData.password[0]}
          </FormControl.ErrorMessage>
          <FormControl.HelperText>
            Must be at least 8 characters.
          </FormControl.HelperText>
        </Stack>
      </FormControl>
      <Button onPress={onSubmit} colorScheme={"purple"}>
        LOGIN
      </Button>
    </View>
  );
}

export default Login;
