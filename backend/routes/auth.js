const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// 회원가입 API
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: "회원가입 성공!" });
  } catch (error) {
    res.status(500).json({ message: "회원가입 실패", error });
  }
});

// 로그인 API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "사용자가 존재하지 않습니다." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "로그인 성공!", token });
  } catch (error) {
    res.status(500).json({ message: "로그인 실패", error });
  }
});

module.exports = router;
