import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const UserList = () => {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isAdmin) {
      axios.get("http://localhost:5000/auth/users", {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then(response => setUsers(response.data))
      .catch(error => console.error("회원 목록 조회 실패", error));
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <h2>접근 권한이 없습니다.</h2>;
  }

  return (
    <div>
      <h2>회원 목록</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email} - {user.isAdmin ? "관리자" : "일반회원"}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
