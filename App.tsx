import { NativeBaseProvider, extendTheme } from "native-base";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./components/context/AuthContext";
import Navigation from "./components/Navigation";
import UserActions from "./components/UserActions";

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
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <UserActions />
        </QueryClientProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
