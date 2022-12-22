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
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useCurrentUser } from "../../components/context/AuthContext";
import { Routes } from "../../helper/globalTypes";
import { RegisterParams, registerUser } from "./helper/api";
import { validateRegisterInput } from "./helper/helper";

function Register() {
  const { login } = useCurrentUser();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });

  const [validationData, setValidationData] = useState({
    username: [] as string[],
    password: [] as string[],
    password2: [] as string[],
    email: [] as string[],
  });
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigation<Routes>();

  const { mutate } = useMutation({
    mutationFn: registerUser,
    onSuccess: (e) => {
      login(e.data);
      navigate.navigate("Login");
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

  function onChangeUserData(key: keyof RegisterParams) {
    return (e: string) => {
      const newData = { ...userData };
      newData[key] = e;
      setUserData(newData);
    };
  }

  function onSubmit() {
    const newValidationData = validateRegisterInput(userData);
    const valid = Object.keys(newValidationData).reduce((acc, key) => {
      return (
        acc &&
        newValidationData[key as keyof typeof newValidationData].length === 0
      );
    }, true);
    if (valid) {
      generalError && setGeneralError("");
      setValidationData({
        username: [] as string[],
        password: [] as string[],
        password2: [] as string[],
        email: [] as string[],
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
        Hi, please register
      </Heading>
      {generalError && <Text color={"error.500"}>{generalError}</Text>}
      <FormControl
        isInvalid={validationData.email.length > 0}
        my={"4"}
        isRequired
      >
        <Stack>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            onChangeText={onChangeUserData("email")}
            color={"white"}
            placeholder="Username"
          />
          <FormControl.ErrorMessage>
            {validationData.email[0]}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
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
      <FormControl
        isInvalid={validationData.password2.length > 0}
        isRequired
        my={"4"}
      >
        <Stack>
          <FormControl.Label>Confirm Password</FormControl.Label>
          <Input
            onChangeText={onChangeUserData("password2")}
            color={"white"}
            type="password"
            placeholder="Confirm Password"
          />
          <FormControl.ErrorMessage>
            {validationData.password2[0]}
          </FormControl.ErrorMessage>
          <FormControl.HelperText>
            Must be at least 8 characters.
          </FormControl.HelperText>
        </Stack>
      </FormControl>
      <Button onPress={onSubmit} colorScheme={"purple"}>
        REGISTER
      </Button>
      <Button
        onPress={() => {
          navigate.navigate("Login");
        }}
        colorScheme={"purple"}
        variant="ghost"
      >
        Already have an account ?
      </Button>
    </View>
  );
}

export default Register;
