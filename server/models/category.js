const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: { type: String, default: "" },
  categoryItems: { type: Array, default: [] },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
