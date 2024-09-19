/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
import { Platform } from 'react-native';

// Register background handler for push notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);

    PushNotification.localNotification({
        channelId: "",
        title: remoteMessage.notification?.title || "Notification",
        message: remoteMessage.notification?.body || "You have a new message",
        playSound: true,
        importance: 4, // Make sure this is HIGH importance
        soundName: 'default',
    });
});

messaging().onMessage(async remoteMessage => {
    console.log('Foreground message received!', remoteMessage);

    PushNotification.localNotification({
        channelId: "zingthing-customer", // Make sure the channel ID matches
        title: remoteMessage.notification?.title || "Notification",
        message: remoteMessage.notification?.body || "You have a new message",
        playSound: true,
        importance: 4, // Make sure this is HIGH importance
        soundName: 'default',
    });
});

// Create a notification channel for Android
if (Platform.OS === 'android') {
    PushNotification.createChannel(
        {
            channelId: "zingthing-customer",
            channelName: "General Notifications",
            channelDescription: "Notifications for general updates and information",
            playSound: true,
            soundName: 'default',
            importance: 4, // Make sure this is HIGH importance
            vibrate: true,
        },
        (created) => console.log(`createChannel returned '${created}'`)
    );
}

AppRegistry.registerComponent(appName, () => App);
