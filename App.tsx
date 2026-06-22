import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyStack from "./src/navigation/stack"; // your navigation file
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';

// Create a QueryClient instance (only once for the app)
const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android') {
        // Request POST_NOTIFICATIONS for Android 13+
        if (Platform.Version >= 33) {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Notification permission granted.');
            } else {
              console.log('Notification permission denied.');
            }
          } catch (err) {
            console.warn(err);
          }
        }
      }

      // Firebase messaging permission request
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken();
      }
    };

    const getFCMToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.log('Error getting FCM token:', error);
      }
    };

    requestNotificationPermission();

    // Foreground messaging listener
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived in foreground!', remoteMessage);
      
      // Display local notification using Notifee
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });

      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || '',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MyStack />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}