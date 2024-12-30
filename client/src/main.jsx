import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import { AuthProvider } from './Components/authContext/AuthContext'; // AuthContext import
import "./index.css";

const rootElement = document.getElementById("root");

// Use ReactDOM.createRoot for React 18 and above
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider> {/* Wrap the app with AuthProvider to provide auth context */}
            <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);