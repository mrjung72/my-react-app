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

  const handleDelete = async (userId) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
  
    try {
      await axios.delete(`http://localhost:5000/auth/users/${userId}`, {
        headers: { Authorization: `${localStorage.getItem("token")}` }
      });
      window.location.reload();
    } catch (error) {
      alert("삭제 실패: " + error.response.data.message);
    }
  };
  
  return (
    <div>
      <h2>회원 목록</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
              {user.email} 
            - {user.isAdmin ? "관리자" : "일반회원"} 
            - {isAdmin && <button onClick={() => handleDelete(user.id)}>삭제</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
