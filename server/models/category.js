const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: String,
  categoryItems: [
    {
      itemName: String,
      itemPrice: Number,
      itemDescription: String,
      itemQuantity: Number,
      itemSize: String,
      itemColor: String,
      itemImages: [
        {
          imageSrc: String,
        },
      ],
    },
  ],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
