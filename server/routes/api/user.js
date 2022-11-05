const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const router = express.Router();
const secret = process.env.JWT_SECRET || "test";

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

    if (!oldUser) throw Error("Użytkownik o takim adresie e-mail nie istnieje");

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      throw Error("Podano błędny adres e-mail lub hasło.");

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({
      result: oldUser,
      token,
      msg: "Logowanie zakończyło się sukcesem.",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, userName, repeatPassword, isSalon, phoneNumber } =
    req.body;

  try {
    const oldUser = await User.findOne({ email });

    const badPass = password !== repeatPassword;

    if (oldUser) throw Error("Istnieje już konto z podanym adresem e-mail.");

    if (badPass) throw Error("Hasła nie moga się różnić.");

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      userName: `${userName}`,
      isSalon,
      phoneNumber,
      allowReservations: false,
      acceptComments: false,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
