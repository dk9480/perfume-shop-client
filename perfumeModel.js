const mongoose = require("mongoose");

const perfumeSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Perfume = mongoose.model("Perfume", perfumeSchema);

module.exports = Perfume;
