const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// 회원가입 API
router.post("/register", async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create({
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false, // 기본값 false
    });
    res.status(201).json({ message: "회원가입 성공!", userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "회원가입 실패", error });
  }
});


// 로그인 API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "사용자가 존재하지 않습니다." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });

    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin }, // isAdmin 포함
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {

    res.status(500).json({ message: "로그인 실패", error });
  }
});

// 회원정보 조회 API (로그인한 사용자만 접근 가능)
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json(user); // 회원정보 반환
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "회원 정보 불러오기 실패", error });
  }
});

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "가입된 회원이 없습니다." });
    }

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "회원 목록 불러오기 실패", error });
  }
});


// 회원 정보 수정
router.put("/users/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { email, password, isAdmin } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

    // 현재 로그인한 사용자가 본인이거나 관리자만 수정 가능
    if (req.user.id !== user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }

    await user.update({ email, password, isAdmin });
    res.json({ message: "회원 정보가 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});


// 회원 삭제 (관리자만 가능)
router.delete("/users/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "관리자만 삭제할 수 있습니다." });
    }

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });

    await user.destroy();
    res.json({ message: "회원이 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류 발생" });
  }
});


module.exports = router;
