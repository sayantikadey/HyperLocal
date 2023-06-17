import React from "react";
import { AuthProvider } from "./api/Authcontext";
import Navigation from "./Navigating screens/Navigation";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
