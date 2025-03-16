import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔹 페이지 이동을 위한 훅 추가
import { useAuth } from "../context/AuthContext"; // AuthContext 가져오기

const Register = () => {
  const { saveEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 useNavigate() 추가
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://myproj.kr:5000/auth/register", { email, password, isAdmin });
      saveEmail(email); // 가입한 이메일 저장
      
      navigate("/login"); 

    } catch (err) {
      setError(err.response?.data?.error.errors[0].message || "회원가입 실패");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        이메일 : <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
        비밀번호 : <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
        관리자 : <input type="isAdmin" placeholder="관리자" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)} required />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;

