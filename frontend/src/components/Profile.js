import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/auth/profile", {
          headers: { Authorization: `${token}` },
        });
        setUser(response.data);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "회원 정보를 불러올 수 없습니다.");
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h2>회원 정보</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user ? (
        <div>
          <p><strong>회원ID:</strong> {user.id}</p>
          <p><strong>이메일:</strong> {user.email}</p>
          <p><strong>관리자:</strong> {user.isAdmin.toString()}</p>
          <p><strong>가입 날짜:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>로딩 중...</p>
      )}
    </div>
  );
};

export default Profile;

