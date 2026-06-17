
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MyStack from "./src/navigation/stack"; // your navigation file

// Create a QueryClient instance (only once for the app)
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
            <MyStack />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}