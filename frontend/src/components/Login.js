import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔹 페이지 이동을 위한 훅 추가
import { useAuth } from "../context/AuthContext"; // AuthContext 가져오기

const Login = () => {
  const { login } = useAuth();
  const { email } = useAuth(); // 저장된 이메일 가져오기
  const { saveEmail } = useAuth();
  const [inputEmail, setInputEmail] = useState(email); // 초기값 설정
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // 🔹 useNavigate() 추가

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email: inputEmail, password });
      saveEmail(inputEmail); // 로그인한 이메일 저장
      login(response.data.token); // 로그인 상태 업데이트


       // 🔹 로그인 성공 후 회원정보 페이지로 이동
       navigate("/profile"); 

    } catch (err) {
      setError(err.response?.data?.message || "로그인 실패");
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="이메일"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        required
      />
      <br/>
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">로그인</button>
    </form>
    </div>
  );
};

export default Login;

