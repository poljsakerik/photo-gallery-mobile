import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import HomeScreen from "../screens/home";
import Album from "../screens/album";
import { useCurrentUser } from "./context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "native-base";

function Navigation() {
  const theme = useTheme();
  const Stack = createNativeStackNavigator();
  const { user } = useCurrentUser();
  console.log(user);
  return (
    <>
      <SafeAreaView style={{ backgroundColor: theme.colors.gray[800] }} />
      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
              />
              <Stack.Screen
                name="Album"
                component={Album}
                options={{
                  headerStyle: {
                    backgroundColor: theme.colors.gray[800],
                  },
                  headerTintColor: "white",
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{
                  headerStyle: {
                    backgroundColor: theme.colors.gray[800],
                  },
                  headerTintColor: "white",
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Navigation;
