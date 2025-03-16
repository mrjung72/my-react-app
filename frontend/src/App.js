import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // AuthContext 가져오기
import Navbar from "./components/Navbar";
import Home from "./Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import UserList from "./components/UserList";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
