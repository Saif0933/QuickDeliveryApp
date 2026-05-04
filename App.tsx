
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import MyStack from "./src/navigation/Stack"; // your navigation file
import { AuthProvider } from './src/Context/AuthContext';
import { CartProvider } from './src/Context/CartContext';
import { WishlistProvider } from './src/Context/WishlistContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Create a QueryClient instance (only once for the app)
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MyStack />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider> 
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}