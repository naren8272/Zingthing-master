//import liraries
import React, { createContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  LogBox,
  StatusBar,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Router from "./src/screens/Router";
import { COLORS } from "./src/common/Utils/Colors";
import Loader from "./src/common/Components/Loader";
import Network from "./src/common/Components/Network";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ContextStates from "./src/screens/StateManagment/StateManagment";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

type VendorContextProps = number | null;
// Create contexts
export const LoaderContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);
export const FCMContext = createContext<string | null>(null);
export const CustomerContext = createContext<number | null>(null);
export const VendorContext = createContext<VendorContextProps>(null);

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [vendorId, setVendorId] = useState<number | null>(2); // Example vendor ID setup 2,5,6

  LogBox.ignoreAllLogs();

  useEffect(() => {
    // Register the device for remote messages
    const registerDevice = async () => {
      await messaging().registerDeviceForRemoteMessages();
    };

    // Request user permission for notifications
    const requestUserPermission = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            {
              title: "Notification Permission",
              message:
                "This app needs access to your notifications to alert you of new messages.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the notifications");
          } else {
            console.log("Notification permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    // Get FCM Token
    const getFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        if (token) {
          setFcmToken(token);
          console.log("Your Firebase Token is:", token);
        } else {
          console.log("Failed", "No token received");
        }
      } catch (err) {
        console.error("Error getting FCM token:", err);
      }
    };

    setCustomerId(4);
    requestUserPermission();
    registerDevice();
    getFcmToken();
  }, []);

  return (
    <ContextStates>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider
            theme={{
              ...DefaultTheme,
              colors: {
                ...DefaultTheme.colors,
                primary: COLORS.DeepPurple,
              },
            }}
          >
            <View style={styles.container}>
              <StatusBar
                backgroundColor={COLORS.White}
                barStyle={"dark-content"}
              />
              <LoaderContext.Provider value={[showLoader, setShowLoader]}>
                <FCMContext.Provider value={fcmToken}>
                  <VendorContext.Provider value={vendorId}>
                    <CustomerContext.Provider value={customerId}>
                      <Network />
                      <Router />
                      {showLoader && <Loader />}
                    </CustomerContext.Provider>
                  </VendorContext.Provider>
                </FCMContext.Provider>
              </LoaderContext.Provider>
            </View>
          </PaperProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </ContextStates>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
