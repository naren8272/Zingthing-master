import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen } from "./AuthStack/SplashScreen";
import NewsFeed from "./AppStack/NewsFeed";
import DashBoard from "./AppStack/DashBoard";
import MyJobs from "./AppStack/MyJobs";
import PostJob from "./AppStack/PostJob";
import ViewJobPost from './AppStack/ViewJobPost';
import ViewCandidateDetails from './AppStack/ViewCandidateDetails';
import CandidatesMatchingScreen from "./AppStack/CandidatesMatchingScreen";
import ViewPdf from "./AppStack/ViewPdf";
import HowItWorks from "./AppStack/HowItWorks";
import { SCREENS } from "../common/Utils/screenName";

export const EmployeeRoutes = ({ Stack }) => {

  return <Stack.Navigator
    initialRouteName={SCREENS.HowItWorks}
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={SCREENS.SplashScreen}
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.DashBoard}
      component={DashBoard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.NewsFeed}
      component={NewsFeed}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.MyJobs}
      component={MyJobs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.PostJob}
      component={PostJob}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.CandidatesMatchingScreen}
      component={CandidatesMatchingScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name={SCREENS.ViewJobPost}
      component={ViewJobPost}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name={SCREENS.ViewCandidateDetails}
      component={ViewCandidateDetails}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name={SCREENS.ViewPdf}
      component={ViewPdf}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name={SCREENS.HowItWorks}
      component={HowItWorks}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
}

const Router = () => {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      // const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      // if (hasLaunched === null) {
      //   await AsyncStorage.setItem('hasLaunched', 'true');
      setInitialRoute(SCREENS.HowItWorks);
      // } else {
      //   setInitialRoute(SCREENS.MyJobs);
      // }
    };

    checkFirstLaunch();
  }, []);

  if (!initialRoute) return null; // Return null until initial route is determined

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={SCREENS.SplashScreen}
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.DashBoard}
          component={DashBoard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.NewsFeed}
          component={NewsFeed}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.MyJobs}
          component={MyJobs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.PostJob}
          component={PostJob}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={SCREENS.CandidatesMatchingScreen}
          component={CandidatesMatchingScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={SCREENS.ViewJobPost}
          component={ViewJobPost}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={SCREENS.ViewCandidateDetails}
          component={ViewCandidateDetails}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={SCREENS.ViewPdf}
          component={ViewPdf}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name={SCREENS.HowItWorks}
          component={HowItWorks}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
