import React, { useEffect, useState } from "react";
import { ActivityIndicator, LogBox, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREENS } from "../common/Utils/screenName";
import SplashScreen from "./AuthStack/SplashScreen";
import OldJobPosts from "./AppStack/OldJobPosts";
import DashBoard from "./AppStack/DashBoard";
import MyJobs from "./AppStack/MyJobs";
import JobDetailsScreen from "./AppStack/JobDetailsScreen";
import PostJob from "./AppStack/PostJob";
import AvailableJob from "./AppStack/AvailableJobs/AvailableJob";
import JobDetails from "./AppStack/AvailableJobs/JobDetails";
import NewsList from "./AppStack/NewsFeed/NewsList";
import ViewPDF from "./AppStack/NewsFeed/ViewPDF";
import ViewJobSearch from "./AppStack/ViewJobSearch";
import AllCandidates from "./AppStack/AvailableJobs/AllCandidates";
import HowItWorks from "./AppStack/HowItWorks";
import LoginScreen from "./AuthStack/LoginScreen";
import SignUpScreen from "./AuthStack/SignUpScreen";
import ForgotPasswordScreen from "./AuthStack/ForgotPasswordScreen";
import useAuthState from "../store/AuthState";
import { EmployeeRoutes } from "../vendor/screens/Router";

LogBox.ignoreAllLogs();

const AuthRotes = ({ Stack }) => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.LoginScreen}

    >
      <Stack.Screen
        name={SCREENS.LoginScreen}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.SignUpScreen}
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={SCREENS.ForgotPasswordScreen}
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  )
}

const JoobSeekerRoutes = ({ Stack }) => {
  return <Stack.Navigator initialRouteName={SCREENS.HowItWorks}
    screenOptions={{
      headerShown: false,
    }} >
    <Stack.Screen
      name={SCREENS.OldJobPosts}
      component={OldJobPosts}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.MyJobs}
      component={MyJobs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.JobDetailsScreen}
      component={JobDetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.PostJob}
      component={PostJob}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.AvailableJob}
      component={AvailableJob}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.JobDetails}
      component={JobDetails}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.NewsFeed}
      component={NewsList}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.NewsFeedData}
      component={ViewPDF}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.ViewJobSearch}
      component={ViewJobSearch}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.DashBoard}
      component={DashBoard}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={SCREENS.AllCandidates}
      component={AllCandidates}
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
  const [loading, setLoading] = useState(true);

  const { user } = useAuthState((state) => state)


  useEffect(() => {
    const checkFirstLaunch = async () => {
      // const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      // if (hasLaunched === null) {
      //   await AsyncStorage.setItem('hasLaunched', 'true');
      setInitialRoute(SCREENS.HowItWorks);
      // } else {
      //   const hasAgreed = await AsyncStorage.getItem('hasAgreed');
      //   if (hasAgreed === 'true') {
      //     setInitialRoute(SCREENS.DashBoard);
      //   }
      // }
      setLoading(false);
    };

    checkFirstLaunch();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {
        user === null ? <AuthRotes Stack={Stack} /> : user.role === "Employer" ? <EmployeeRoutes Stack={Stack} /> : <JoobSeekerRoutes Stack={Stack} />
      }
    </NavigationContainer>
  );
};

export default Router;
