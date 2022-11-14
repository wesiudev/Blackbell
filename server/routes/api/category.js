const express = require("express");
const Category = require("../../models/category");
const router = express.Router();
const ownerAuth = require("../../middleware/ownerAuth.js");

router.post("/", ownerAuth, async (req, res) => {
  try {
    const { category, actionType } = req.body;
    if (category === "") throw Error("Pole kategorii nie może być puste.");
    switch (actionType) {
      case "ADD":
        const categoryAlreadyExists = await Category.findOne({
          categoryName: category,
        });
        if (JSON.stringify(categoryAlreadyExists).length > 5)
          throw Error(`Kategoria ${category} już istnieje.`);
        await Category.create({
          categoryName: `${category}`,
        });
        const result = await Category.find({});
        res.status(200).json({ msg: "added successfully", data: result });
        break;
      case "REMOVE":
        const categoryToRemove = await Category.findOne({
          categoryName: category,
        });
        await Category.findByIdAndRemove(categoryToRemove._id);
        const categories = await Category.find({});
        res.status(200).json({ msg: "removed successfully", data: categories });
        break;
      default:
        break;
    }
    res.status(200);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
