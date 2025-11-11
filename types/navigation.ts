import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Landing: undefined;
  TrackDetails: { trackId: string; name: string };
};

export type TrackDetailsScreenProps = RouteProp<RootStackParamList, "TrackDetails">;
export type LandingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Landing">;
