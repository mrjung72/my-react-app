import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">My App</h1>
      <div>
        <Link to="/login" className="px-4 hover:underline">로그인</Link>
        <Link to="/profile" className="px-4 hover:underline">내 정보</Link>
        <Link to="/users" className="px-4 hover:underline">회원 목록</Link> 
      </div>
    </nav>
  );
};

export default Navbar;
