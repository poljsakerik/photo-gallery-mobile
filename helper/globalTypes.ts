import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Album: { id: string };
};

export type Routes = NativeStackNavigationProp<RootStackParamList>;
