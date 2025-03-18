import React, { useState, useEffect } from "react";
import axios from "axios";

const EditProfile = ({ userId, isAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isadmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/auth/users/${userId}`)
      .then((res) => {
        setEmail(res.data.email);
        setIsAdmin(res.data.isAdmin); // 관리자 여부 추가
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/auth/users/${userId}`, { email, password, isAdmin: isadmin }, {
        headers: { Authorization: `${localStorage.getItem("token")}` }
      });
      setMessage("회원 정보가 수정되었습니다.");
    } catch (error) {
      setMessage("오류 발생: " + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>회원 정보 수정</h2>
      {message && <p>{message}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="새 비밀번호" />
      
      {/* 관리자만 관리자 여부를 변경 가능 */}
      {isAdmin && (
        <div>
          <label>
            <input type="checkbox" checked={isadmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            관리자 여부
          </label>
        </div>
      )}

      <button onClick={handleUpdate}>수정하기</button>
    </div>
  );
};

export default EditProfile;
