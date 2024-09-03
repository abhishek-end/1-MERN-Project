const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Categories schema
const categories_model = new Schema({
  type: { type: String, default: "Investment" },
  color: { type: String, default: "#fe0000" },
});

// Transaction schema
const transaction_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "investment" },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

// Creating models
const Categories = mongoose.model("categories", categories_model);
const Transaction = mongoose.model("transaction", transaction_model);

// Exporting models
module.exports = {
  Categories,
  Transaction,
};
