const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Owner = require("../../models/owner");
const router = express.Router();
const secret = process.env.JWT_SECRET || "test";

router.post("/signin", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const oldUser = await Owner.findOne({ userName });

    if (!oldUser) throw Error("Użytkownik o takim adresie e-mail nie istnieje");

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      throw Error("Podano błędny adres e-mail lub hasło.");

    if (!password) throw Error("Błąd logowania");

    const token = jwt.sign(
      { userName: oldUser.userName, id: oldUser._id },
      secret,
      {
        expiresIn: "1h",
      }
    );

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

router.post("/category", async (req, res) => {
  try {
    const { userName, category, actionType } = req.body;

    const user = await Owner.findOne({ userName });
    let msg;

    const categoryAlreadyExists = user.categories.filter(
      (oldCategory) => oldCategory === category
    );

    switch (actionType) {
      case "ADD":
        if (categoryAlreadyExists.length > 0) {
          msg = `Kategoria ${category} już istnieje.`;
        } else {
          await Owner.updateOne(
            { _id: user._id },
            {
              $push: { categories: `${category}` },
            }
          );
          msg = "Pomyślnie dodano kategorię.";
        }
        break;
      case "REMOVE":
        await Owner.updateOne(
          { _id: user._id },
          {
            $pull: { categories: `${category}` },
          }
        );
        msg = "Pomyślnie usunięto kategorię";
        break;
      default:
        break;
    }
    const result = await Owner.findById(user._id);
    res.status(200).json({ result, msg });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
