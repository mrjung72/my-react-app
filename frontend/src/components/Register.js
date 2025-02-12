import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔹 페이지 이동을 위한 훅 추가

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  console.log("email=", email);
  console.log("password=", password);
  const navigate = useNavigate(); // 🔹 useNavigate() 추가
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", { email, password });
      alert("회원가입 성공!");
      navigate("/login"); 

    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "회원가입 실패");
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        이메일 : <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/>
        비밀번호 : <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;

