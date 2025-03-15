import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // AuthContext 가져오기

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <Link to="/">홈</Link> | 
      <Link to="/users">회원목록</Link> | 
      {isAuthenticated ? (
        <>
          <Link to="/profile">내 정보</Link> | 
          <button onClick={() => { logout(); window.location.href = "/"; }}>로그아웃</button>
        </>
      ) : (
        <>
          <Link to="/login">로그인</Link> | 
          <Link to="/register">회원가입</Link> | 
        </>
    )}
    </nav>
  );
};

export default Navbar;

