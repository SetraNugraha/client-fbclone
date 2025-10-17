/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./features/auth/AuthContext";
import { PostContextProvider } from "./features/posts/PostContext";
import Login from "../src/pages/Login";
import Homepage from "../src/pages/Homepage";
import Profile from "./pages/Profile";
import { QueryClientProvider } from "react-query";
import PrivateRoute from "./features/auth/PrivateRoute";
import { queryClient } from "./lib/queryClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Routes>
            {/* LOGIN */}
            <Route path="/" element={<Login />} />
            {/* END LOGIN */}
            {/* PRIVATE ROUTE */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/homepage"
                element={
                  <PostContextProvider>
                    <Homepage />
                  </PostContextProvider>
                }
              />
              <Route
                path="/profile/:userId"
                element={
                  <PostContextProvider>
                    <Profile />
                  </PostContextProvider>
                }
              />
            </Route>
            {/* END PRIVATE ROUTE */}
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
