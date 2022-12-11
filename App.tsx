import { NativeBaseProvider, extendTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/home";
import { SafeAreaView } from "react-native-safe-area-context";
import Login from "./screens/login";

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
      rounded: "full",
    },
  },
});

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView></SafeAreaView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Login}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
