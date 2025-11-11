import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AudioPro, AudioProContentType } from "react-native-audio-pro";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import TrackDetails from "./features/tracks/TrackDetails";
import { Landing } from "./Landing";
import { store } from "./store";

AudioPro.configure({
  contentType: AudioProContentType.MUSIC,
  debug: __DEV__,
});

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#323349",
    text: "#b6b8c0ff",
    borderColor: "#5f616c",
  },
};

const Stack = createNativeStackNavigator();
const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
        headerStyle: { backgroundColor: AppTheme.colors.background },
        headerTitle: "",
        headerTintColor: AppTheme.colors.text,
      }}
    >
      <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
      <Stack.Screen name="TrackDetails" component={TrackDetails} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
        <SafeAreaProvider>
          <RootStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
