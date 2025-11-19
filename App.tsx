// import React from "react";
// import MyStack from "./src/navigation/Stack"; // adjust path

// export default function App() {
//   return <MyStack />;
// }

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import MyStack from "./src/navigation/Stack"; // your navigation file

// Create a QueryClient instance (only once for the app)
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyStack />
    </QueryClientProvider>
  );
}
