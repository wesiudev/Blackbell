const express = require("express");
const Product = require("../../models/product");
const Category = require("../../models/category");
const router = express.Router();
const ownerAuth = require("../../middleware/ownerAuth.js");

router.post("/createProduct", async (req, res) => {
  try {
    const {
      category,
      subCategory,
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
      itemCategoryID: `${id}`,
      itemCategoryName: `${category}`,
      itemSubCategoryName: `${subCategory}`,
    };
    await Product.create(product);
    console.log(product);
    const products = await Product.find({});
    res.status(200).json({
      data: products,
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
    const { productId } = req.body;
    const itemToRemove = await Product.findOne({ productId });
    console.log(itemToRemove);
    if (itemToRemove === null)
      throw Error(`Produkt ${productId} nie istnieje.`);
    await Product.findByIdAndDelete(productId);
    const products = await Product.find({});
    res.status(200).json({
      msg: { id: "SUCCESS", text: "Pomyślnie usunięto produkt." },
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/moveProduct", async (req, res) => {
  try {
    const { productId, subCategory, actionType } = req.body;
    const itemToMove = await Product.findOne({ productId });
    if (itemToMove === null) throw Error(`Produkt ${productId} nie istnieje.`);

    switch (actionType) {
      case "moveToSubCategory":
        await Product.updateOne(
          { _id: itemToMove._id },
          { $set: { subCategory: subCategory } }
        );
        break;
      case "removeFromSubCategory":
        await Product.updateOne(
          { _id: itemToMove._id },
          { $set: { itemSubCategoryName: "" } }
        );
        break;
      default:
        break;
    }
    const products = await Product.find({});
    res.status(200).json({
      msg: {
        id: "SUCCESS",
        text: `Pomyślnie dodano produkt do podkategorii ${subCategory}.`,
      },
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.post("/editProduct", async (req, res) => {
  try {
    const { productId, userInput, attributeToChange } = req.body;
    const itemToEdit = await Product.findOne({ productId });
    if (itemToEdit === null) throw Error(`Produkt ${productId} nie istnieje.`);
    await Product.updateOne(
      { _id: itemToEdit._id },
      { $set: { attributeToChange: userInput } }
    );
    const product = await Product.find({ productId });
    res.status(200).json({
      msg: {
        id: "SUCCESS",
        text: `Pomyślnie edytowano produkt.`,
      },
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});

router.get("/fetchProducts", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
});
router.post("/fetchProduct", async (req, res) => {
  try {
    const { itemId } = req.body;

    const product = await Product.findOne({ _id: itemId });
    console.log(product.itemName);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
    console.log(error);
  }
});

module.exports = router;
