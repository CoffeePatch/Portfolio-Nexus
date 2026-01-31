import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";
import Analysis from "./pages/Analysis";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Expenses from "./pages/Expenses";
import Transactions from "./pages/Transactions";
import MutualFunds from "./pages/MutualFunds";
import { AuthProvider } from "./providers/AuthProvider";
import { ProtectedRoute } from "./components/shared/ProtectedRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />, // Removed ProtectedRoute wrapper for dev mode
    children: [
      { index: true, element: <Dashboard /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "expenses", element: <Expenses /> },
      { path: "mutual-funds", element: <MutualFunds /> },
      { path: "transactions", element: <Transactions /> },
      { path: "analysis", element: <Analysis /> },
      { path: "market", element: <Market /> },
      { path: "community", element: <Community /> },
      { path: "support", element: <Support /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
