const express = require("express");
const Category = require("../../models/category");
const router = express.Router();
const ownerAuth = require("../../middleware/ownerAuth.js");

router.post("/", async (req, res) => {
  try {
    const { category, actionType } = req.body;
    if (category === "") throw Error("Pole kategorii nie może być puste.");
    let categories;
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
        categories = await Category.find({});
        res.status(200).json({
          msg: { id: "SUCCESS", text: "Pomyślnie dodano kategorię." },
          data: categories,
        });
        break;
      case "REMOVE":
        const categoryToRemove = await Category.findOne({
          categoryName: category,
        });
        await Category.findByIdAndRemove(categoryToRemove._id);
        categories = await Category.find({});
        res.status(200).json({
          msg: { id: "SUCCESS", text: "Kategoria usunięta." },
          data: categories,
        });
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

router.post("/createProduct", async (req, res) => {
  try {
    const {
      category,
      itemName,
      itemPrice,
      itemDescription,
      itemQuantity,
      itemSize,
      itemColor,
      itemImages,
    } = req.body;
    const categoryToWorkWith = await Category.findOne({
      categoryName: category,
    });
    if (categoryToWorkWith === null)
      throw Error(`Brak kategori ${category}...`);
    const id = categoryToWorkWith._id;
    const product = {
      itemName,
      itemPrice,
      itemQuantity,
      itemDescription,
      itemSize,
      itemColor,
      itemImages,
    };
    await Category.updateOne(
      { _id: id },
      {
        $push: {
          categoryItems: product,
        },
      }
    );
    const categories = await Category.find({});
    res.status(200).json({
      data: categories,
      msg: { id: "SUCCESS", text: "Pomyślnie dodano produkt." },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/deleteProduct", async (req, res) => {
  try {
    const { category, itemId } = req.body;
    const categoryToWorkWith = await Category.findOne({
      categoryName: category,
    });
    if (categoryToWorkWith === null)
      throw Error(`Brak kategori ${category}...`);
    if (categoryToWorkWith.categoryItems._id === null)
      throw Error(`Brak przedmiotu o id ${id}...`);
    const id = categoryToWorkWith._id;

    const itemToRemove = categoryToWorkWith.categoryItems.find(
      (item) => item._id == itemId
    );
    if (itemToRemove === undefined)
      throw Error(`Przedmiot ${itemId} nie istnieje...`);
    await Category.updateOne(
      { _id: id },
      {
        $pull: {
          categoryItems: { _id: itemId },
        },
      }
    );
    const categories = await Category.find({});
    res.status(200).json({
      msg: { id: "SUCCESS", text: "Pomyślnie usunięto produkt." },
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

module.exports = router;
