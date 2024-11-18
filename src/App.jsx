import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/login/index.jsx";
import Todos from "./components/todos/index.jsx";
import { AuthProvider } from "./authContext/auth.jsx";
import ProtectedRoute from "./firebase/protectedRoute.jsx";

const App = () => {
  return (
    <>
      <div className="main-wrapper">
        <AuthProvider>
          <Router>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/"
                element={
                  <ProtectedRoute>
                    <Todos />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </>
  );
};

export default App;
