import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  // Display the notification
  PushNotification.localNotification({
    channelId: "zingthing-vendor", // Make sure this matches the channel ID you created
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    playSound: true,
    soundName: 'default',
  });
});

messaging().onMessage(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

  // Display the notification
  PushNotification.localNotification({
    channelId: "zingthing-vendor", // Make sure this matches the channel ID you created
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    playSound: true,
    soundName: 'default',
  });
});
