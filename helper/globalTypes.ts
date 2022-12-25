import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  Album: { id: number };
};

export type Routes = NativeStackNavigationProp<RootStackParamList>;
