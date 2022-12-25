import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./screens/login";
import { QueryClient, QueryClientProvider } from "react-query";
import Register from "./screens/register";
import AuthContextProvider from "./components/context/AuthContext";

const Stack = createNativeStackNavigator();

const theme = extendTheme({
  components: {
    Flex: {
      baseStyle: {
        _light: { background: "white" },
        _dark: { background: "black" },
      },
    },
  },
  Button: {
    baseStyle: {
      _text: { fontWeight: "bold" },
    },
  },
});

export const queryClient = new QueryClient();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView></SafeAreaView>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={Login}
              />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
