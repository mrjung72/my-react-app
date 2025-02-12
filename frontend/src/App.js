import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import UserList from "./components/UserList";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/login">로그인</Link> | 
        <Link to="/register">회원가입</Link> | 
        <Link to="/profile">내 정보</Link>|
        <Link to="/users">회원목록</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default App;
